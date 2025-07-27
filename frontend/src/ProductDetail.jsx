import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from './data';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  if (!product) return <div style={{ padding:20 }}>Produit introuvable…</div>;

  const [qty, setQty] = useState(1);
  const total = (product.price * qty).toFixed(2);

  return (
    <div style={{ maxWidth:600, margin:'40px auto', padding:20 }}>
      <button onClick={()=>navigate(-1)}>← Retour</button>
      <h1>{product.name}</h1>
      <img src={product.image} alt="" style={{ width:'100%', borderRadius:8 }} />
      <p>{product.description}</p>
      <div>
        <button onClick={()=>setQty(q=>Math.max(1,q-1))}>–</button>
        <span style={{ margin:'0 10px' }}>{qty}</span>
        <button onClick={()=>setQty(q=>q+1)}>+</button>
      </div>
      <button onClick={()=>console.log('Ajouter',qty)} style={{ marginTop:20 }}>
        Ajouter au panier – {total} €
      </button>
    </div>
  );
}
