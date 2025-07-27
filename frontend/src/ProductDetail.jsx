import React, { useState }   from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products }          from './data';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product  = products.find(p => p.id.toString() === id);
  if (!product) return <div>Produit non trouvé</div>;

  // initialiser l’état des sélections pour chaque groupe
  const initial = {};
  product.options.forEach((opt,i) => {
    if (opt.type === 'checkbox') initial[i] = Array(opt.choices.length).fill(0);
    else /* radio/select */        initial[i] = 0;
  });
  const [sel, setSel] = useState(initial);

  // gère + / - pour checkbox
  const handleCheckbox = (g, c, delta) => {
    setSel(prev => {
      const arr = [...prev[g]];
      arr[c] = Math.max(0, Math.min(opt.max, arr[c] + delta));
      return { ...prev, [g]: arr };
    });
  };

  // calcule le total
  const total = product.price
    + product.options.reduce((sum,opt,g)=>{
        if (opt.type==='checkbox')
          return sum + sel[g].reduce((s,v,i)=>s + v*opt.choices[i].price, 0);
        // radio/select
        return sum + (opt.choices[sel[g]]?.price||0);
      }, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={()=>navigate(-1)} className="text-red-600 mb-4">← Retour</button>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full my-4"/>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-6">{product.price} €</p>

      {product.options.map((opt, g) => (
        <section key={g} className="mb-8">
          <h2 className="text-lg font-bold">{opt.name}</h2>
          <small className="text-gray-500">Encore {opt.max} ingrédient{opt.max>1?'s':''}</small>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {opt.choices.map((c,j) => (
              <div key={j} className="bg-white p-4 rounded-xl shadow text-center">
                <img src={c.image} alt={c.label} className="mx-auto mb-2 h-24"/>
                <p className="font-medium">{c.label}</p>
                {c.price>0 && <small className="block">+{c.price}€</small>}

                {opt.type==='checkbox' && (
                  <div className="flex items-center justify-center mt-2 space-x-2">
                    <button onClick={()=>handleCheckbox(g,j,-1)}>-</button>
                    <span>{sel[g][j]}</span>
                    <button onClick={()=>handleCheckbox(g,j,1)}>+</button>
                  </div>
                )}

                {opt.type==='radio' && (
                  <div className="mt-2">
                    <input
                      type="radio"
                      name={`opt-${g}`}
                      checked={sel[g]===j}
                      onChange={()=>setSel(prev=>({ ...prev, [g]: j }))}
                    />
                  </div>
                )}

                {opt.type==='select' && j===0 && (
                  <select
                    className="mt-2 w-full"
                    value={sel[g]}
                    onChange={e=>setSel(prev=>({ ...prev, [g]: +e.target.value }))}
                  >
                    {opt.choices.map((c2,ii)=>(
                      <option key={ii} value={ii}>
                        {c2.label}{c2.price>0?` (+${c2.price}€)`:''}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <button
        onClick={()=>{/* ajoute ton objet { productId:id, selections:sel } au panier */}}
        className="w-full bg-red-600 text-white py-3 rounded-full text-lg"
      >
        Ajouter au panier {total.toFixed(2)}€
      </button>
    </div>
  );
}
