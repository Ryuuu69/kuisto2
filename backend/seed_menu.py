import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000").rstrip("/")
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "")
HEADERS = {
    "Content-Type": "application/json"
}
if ADMIN_TOKEN:
    HEADERS["X-Admin-Token"] = ADMIN_TOKEN

def get_json(path, params=None):
    resp = requests.get(f"{BASE_URL}{path}", headers=HEADERS, params=params or {})
    if not resp.ok:
        print(f"[GET ERROR] {path} -> {resp.status_code} {resp.text}")
        return []
    return resp.json()

def post_json(path, payload):
    resp = requests.post(f"{BASE_URL}{path}", headers=HEADERS, json=payload)
    if not resp.ok:
        print(f"[POST ERROR] {path} payload={payload} -> {resp.status_code} {resp.text}")
        return None
    return resp.json()

def find_or_create_category(name):
    cats = get_json("/api/categories")
    for c in cats:
        if c.get("name", "").strip().lower() == name.strip().lower():
            return c["id"]
    created = post_json("/api/categories", {"name": name})
    return created["id"] if created else None

def find_or_create_supplement(name, price):
    sups = get_json("/api/supplements")
    for s in sups:
        if s.get("name", "").strip().lower() == name.strip().lower():
            return s["id"]
    created = post_json("/api/supplements", {"name": name, "price": price})
    return created["id"] if created else None

def find_product_by_slug(slug):
    prods = get_json("/api/products")
    for p in prods:
        if p.get("slug", "").strip().lower() == slug.strip().lower():
            return p
    return None

def create_product(prod_def, category_id):
    existing = find_product_by_slug(prod_def["slug"])
    if existing:
        print(f"[SKIP] Produit existant réutilisé: {prod_def['name']}")
        return existing
    payload = {
        "name": prod_def["name"],
        "description": prod_def.get("description", ""),
        "base_price": prod_def["price"] if prod_def["price"] is not None else 0.0,
        "image_url": prod_def.get("image") or prod_def.get("image_url", ""),
        "category_id": category_id
    }
    created = post_json("/api/products", payload)
    if created:
        print(f"[CREATE] Produit: {prod_def['name']} (id={created.get('id')})")
    return created

def find_or_create_option(name, product_id):
    prod = get_json(f"/api/products/{product_id}")
    if not prod:
        return None
    for o in prod.get("options", []):
        if o.get("name", "").strip().lower() == name.strip().lower():
            return o
    created = post_json("/api/options", {"name": name, "product_id": product_id})
    if created:
        print(f"  Option créée: {name} pour product_id={product_id} (id={created.get('id')})")
    return created

def find_or_create_choiceoption(name, price_modifier, option_id):
    opt = get_json(f"/api/options/{option_id}")
    if opt:
        for c in opt.get("choiceoptions", []):
            if c.get("name", "").strip().lower() == name.strip().lower():
                return c
    created = post_json("/api/choiceoptions", {
        "name": name,
        "price_modifier": price_modifier,
        "option_id": option_id
    })
    if created:
        print(f"    ChoiceOption créée: {name} (option_id={option_id}, id={created.get('id')})")
    return created

def seed():
    print("✅ Démarrage du seed complet du menu...")

    # Répertoire complet du menu adapté de product-data.js
    menu = [
        # TACOS
        {
            "slug": "tacos-classique",
            "name": "TACOS CLASSIQUE",
            "category": "tacos",
            "description": "Tacos Classique : salade fraîche, tendres croutons, tomates cerises, copeaux de parmesan",
            "price": 5.50,
            "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&crop=center",
            "options": {
                "supplements": [
                    {"name": "Cheddar", "price": 1.00},
                    {"name": "Avocat", "price": 1.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 2.90},
                    {"name": "Milkshake Vanille", "price": 4.50},
                    {"name": "Limonade", "price": 2.50}
                ],
                "remove": [
                    {"name": "Sans croutons"},
                    {"name": "Sans parmesan"},
                    {"name": "Sans tomates"}
                ]
            }
        },
        {
            "slug": "spicy-tacos",
            "name": "SPICY TACOS",
            "category": "tacos",
            "description": "Potato bun, double steak haché smashé, oignons frais, pickles, salade double cheddar + frites + boisson",
            "price": 5.50,
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Steak supplémentaire", "price": 2.50},
                    {"name": "Bacon", "price": 1.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 0},
                    {"name": "Milkshake", "price": 2.00},
                    {"name": "Limonade", "price": 0}
                ],
                "remove": [
                    {"name": "Sans cheddar"},
                    {"name": "Sans oignons"},
                    {"name": "Sans pickles"},
                    {"name": "Sans salade"}
                ]
            }
        },
        {
            "slug": "tacos-vege",
            "name": "TACOS VÉGÉTARIEN",
            "category": "tacos",
            "description": "Potato bun, double steak haché smashé, salade iceberg, pickles, oignons frais, double cheddar",
            "price": 8.90,
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&crop=center",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Steak supplémentaire", "price": 2.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 2.90},
                    {"name": "Milkshake", "price": 4.50}
                ],
                "remove": [
                    {"name": "Sans cheddar"},
                    {"name": "Sans oignons"},
                    {"name": "Sans pickles"}
                ]
            }
        },

        # HOT-DOGS
        {
            "slug": "hot-cheesy",
            "name": "HOT-G CHEESY",
            "category": "hot-dogs",
            "description": "Frites fraîches coupées maison, cuites dans l'huile de tournesol",
            "price": 3.50,
            "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop&crop=center",
            "options": {
                "supplements": [
                    {"name": "Sauce cheddar", "price": 0.50},
                    {"name": "Sauce barbecue", "price": 0.50}
                ]
            }
        },
        {"slug": "hot-spicy", "name": "HOT-G SPICY", "category": "hot-dogs",
         "description": "Pain complet, steak végétal, salade, tomate, frites + boisson",
         "price": 10.90, "image": "img/menu-veggie.jpg", "options": {}},
        {"slug": "hot-bacon", "name": "HOT-G BACON", "category": "hot-dogs",
         "description": "Boisson gazeuse sans sucre", "price": 2.00, "image": "img/cola-zero.jpg", "options": {}},
        {"slug": "hot-veggie", "name": "HOT-G VEGGIE", "category": "hot-dogs",
         "description": "Boisson gazeuse sans sucre", "price": 2.00, "image": "img/cola-zero.jpg", "options": {}},
        {"slug": "hot-fish", "name": "HOT-G FISH", "category": "hot-dogs",
         "description": "Boisson gazeuse sans sucre", "price": 2.00, "image": "img/cola-zero.jpg", "options": {}},

        # MENUS BURGERS
        {
            "slug": "smash-burger",
            "name": "MENU SMASH BURGER",
            "category": "menus-burgers",
            "description": "Burger smash avec frites, boisson au choix et suppléments possibles.",
            "price": 9.90,
            "image": "img/smash-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Bacon", "price": 1.50}
                ],
                "remove": [
                    {"name": "Sans oignons"},
                    {"name": "Sans sauce"}
                ],
                "side": [
                    {"name": "Frites classiques", "price": 0},
                    {"name": "Potatoes", "price": 0.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 0},
                    {"name": "Ice Tea", "price": 0},
                    {"name": "Eau", "price": 0}
                ]
            }
        },
        {
            "slug": "golden-menu",
            "name": "MENU GOLDEN",
            "category": "menus-burgers",
            "description": "Golden burger avec frites, boisson, supplément possible.",
            "price": 11.50,
            "image": "img/golden-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Œuf", "price": 1.00}
                ],
                "remove": [
                    {"name": "Sans cornichons"},
                    {"name": "Sans salade"}
                ],
                "side": [
                    {"name": "Frites classiques", "price": 0},
                    {"name": "Potatoes", "price": 0.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 0},
                    {"name": "Sprite", "price": 0}
                ]
            }
        },
        {
            "slug": "signature-burger",
            "name": "MENU SIGNATURE BURGER",
            "category": "menus-burgers",
            "description": "Burger smash avec frites, boisson au choix et suppléments possibles.",
            "price": 9.90,
            "image": "img/smash-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Bacon", "price": 1.50}
                ],
                "remove": [
                    {"name": "Sans oignons"},
                    {"name": "Sans sauce"}
                ],
                "side": [
                    {"name": "Frites classiques", "price": 0},
                    {"name": "Potatoes", "price": 0.50}
                ],
                "drinks": [
                    {"name": "Coca-Cola", "price": 0},
                    {"name": "Ice Tea", "price": 0},
                    {"name": "Eau", "price": 0}
                ]
            }
        },

        # SIDES (tailles)
        {
            "slug": "chicken-pop",
            "name": "CHICKEN POP",
            "category": "sides",
            "description": "Petites bouchées de poulet croustillant.",
            "price": None,
            "image": "img/chicken-pop.jpg",
            "options": {
                "sizes": [
                    {"name": "S (200g)", "price": 2.99},
                    {"name": "M (350g)", "price": 3.99},
                    {"name": "L (500g)", "price": 4.99}
                ]
            }
        },
        {
            "slug": "stick-mozza",
            "name": "STICK MOZZA",
            "category": "sides",
            "description": "Bâtonnets de mozzarella panés.",
            "price": None,
            "image": "img/stick-mozza.jpg",
            "options": {
                "sizes": [
                    {"name": "S (4p)", "price": 3.50},
                    {"name": "M (6p)", "price": 4.50},
                    {"name": "L (8p)", "price": 5.50}
                ]
            }
        },
        {
            "slug": "nuggets",
            "name": "NUGGETS",
            "category": "sides",
            "description": "Nuggets de poulet croustillants.",
            "price": None,
            "image": "img/nuggets.jpg",
            "options": {
                "sizes": [
                    {"name": "S (4p)", "price": 3.50},
                    {"name": "M (6p)", "price": 4.50},
                    {"name": "L (8p)", "price": 5.50}
                ]
            }
        },
        {
            "slug": "cheese-side",
            "name": "CHEESE",
            "category": "sides",
            "description": "Portion de fromage.",
            "price": 2.90,
            "image": "img/cheese.jpg",
            "options": {}
        },
        {
            "slug": "double-cheese-side",
            "name": "DOUBLE CHEESE",
            "category": "sides",
            "description": "Double portion de fromage.",
            "price": 3.90,
            "image": "img/cheese.jpg",
            "options": {}
        },
        {
            "slug": "frites-maison",
            "name": "FRITES MAISON",
            "category": "sides",
            "description": "Frites fraîches maison.",
            "price": 3.00,
            "image": "img/frites.jpg",
            "options": {}
        },

        # BURGERS SIMPLES
        {
            "slug": "smash-burger-simple",
            "name": "SMASH BURGER",
            "category": "burgers",
            "description": "Burger smash classique avec steak, cheddar, salade, sauce au choix.",
            "price": 6.50,
            "image": "img/smash-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Bacon", "price": 1.50}
                ],
                "remove": [
                    {"name": "Sans oignons"},
                    {"name": "Sans sauce"}
                ]
            }
        },
        {
            "slug": "golden-burger-simple",
            "name": "GOLDEN BURGER",
            "category": "burgers",
            "description": "Burger golden avec steak, cheddar, sauce maison, salade.",
            "price": 7.50,
            "image": "img/golden-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Œuf", "price": 1.00}
                ],
                "remove": [
                    {"name": "Sans cornichons"},
                    {"name": "Sans salade"}
                ]
            }
        },
        {
            "slug": "signature-burger-simple",
            "name": "SIGNATURE BURGER",
            "category": "burgers",
            "description": "Burger signature, sauce maison, double cheddar, salade, tomate.",
            "price": 7.90,
            "image": "img/signature-burger.jpg",
            "options": {
                "supplements": [
                    {"name": "Cheddar supplémentaire", "price": 1.00},
                    {"name": "Bacon", "price": 1.50}
                ],
                "remove": [
                    {"name": "Sans oignons"},
                    {"name": "Sans tomate"}
                ]
            }
        },

        # BUCKETS
        {
            "slug": "bucket-duo",
            "name": "BUCKET DUO",
            "category": "buckets",
            "description": "Bucket Duo : 16 wings ou 8 wings + 6 tenders, avec 2 frites maison, 4 sauces et 2 boissons de 33 cl. Le combo parfait à partager.",
            "price": None,
            "image": "img/nuggets.jpg",
            "options": {
                "sizes": [
                    {"name": "16 wings", "price": 18.00},
                    {"name": "8 wings et 6 Tenders", "price": 19.00}
                ]
            }
        },
        {
            "slug": "bucket-family",
            "name": "BUCKET FAMILY",
            "category": "buckets",
            "description": "Bucket Family : 28 wings ou 16 wings + 10 tenders, avec 4 frites maison, 8 sauces et boisson 1,5L. Le combo familial à partager.",
            "price": None,
            "image": "img/nuggets.jpg",
            "options": {
                "sizes": [
                    {"name": "28 wings", "price": 32.00},
                    {"name": "16 wings et 10 Tenders", "price": 34.00}
                ]
            }
        },

        # DESSERTS
        {
            "slug": "tarte",
            "name": "Tarte au daim",
            "category": "desserts",
            "description": "Tarte au Daim : base sablée, crème caramel, éclats de Daim et nappage chocolat. Dessert gourmand et croquant à partager.",
            "price": 3.50,
            "image": "img/cheese.jpg",
            "options": {}
        },
        {
            "slug": "tiramisu",
            "name": "Tiramisu",
            "category": "desserts",
            "description": "Mascarpone crémeux, Nutella, spéculoos croquant et éclats d’Orio — le tiramisu qui fait fondre.",
            "price": 3.50,
            "image": "img/cheese.jpg",
            "options": {}
        },

        # BOISSONS
        {
            "slug": "boisson-33cl",
            "name": "Boisson 33 CL",
            "category": "boissons",
            "description": "Canette de 33 cl au choix (Coca-Cola, Sprite, Fanta, etc.).",
            "price": 2.00,
            "image": "img/boisson-33cl.jpg",
            "options": {}
        },
        {
            "slug": "boisson-1-5l",
            "name": "Boisson 1,5 L",
            "category": "boissons",
            "description": "Bouteille de 1,5 litre au choix.",
            "price": 3.50,
            "image": "img/boisson-1-5l.jpg",
            "options": {}
        },

        # MENUS BAMBINO
        {
            "slug": "menu-cheese-burger",
            "name": "Menu Cheese Burger",
            "category": "menus-bambino",
            "description": "Cheese burger, sauce ketchup, une portion de frites, et un Capri Sun.",
            "price": 6.00,
            "image": "img/menu-cheese-burger.jpg",
            "options": {}
        },
        {
            "slug": "menu-nuggets-kids",
            "name": "Menu Nuggets Kids",
            "category": "menus-bambino",
            "description": "5 nuggets, sauce ketchup, une portion de frites, et un Capri Sun.",
            "price": 6.00,
            "image": "img/menu-nuggets-kids.jpg",
            "options": {}
        },
        {
            "slug": "menu-mini-tacos",
            "name": "Menu Mini Tacos",
            "category": "menus-bambino",
            "description": "Mini tacos, une portion de frites, et un Capri Sun.",
            "price": 6.00,
            "image": "img/menu-mini-tacos.jpg",
            "options": {}
        }
    ]

    category_cache = {}
    for prod in menu:
        cat_name = prod["category"]
        if cat_name not in category_cache:
            cat_id = find_or_create_category(cat_name)
            category_cache[cat_name] = cat_id
            print(f"[CATEGORY] '{cat_name}' -> id {cat_id}")
        else:
            cat_id = category_cache[cat_name]

        product_obj = create_product(prod, cat_id)
        if not product_obj:
            print(f"[ERROR] création produit {prod['name']} échouée, skip")
            continue
        product_id = product_obj["id"]

        # 1. Suppléments (globaux)
        for sup in prod.get("options", {}).get("supplements", []):
            sup_id = find_or_create_supplement(sup["name"], sup.get("price", 0))
            print(f"  [SUPPLÉMENT] '{sup['name']}' -> id {sup_id}")

        # 2. Retraits -> option "Modifications"
        removes = prod.get("options", {}).get("remove", [])
        if removes:
            opt_modifs = find_or_create_option("Modifications", product_id)
            if opt_modifs:
                opt_id = opt_modifs["id"]
                for r in removes:
                    find_or_create_choiceoption(r["name"], 0.0, opt_id)

        # 3. Boissons -> option "Boisson"
        drinks = prod.get("options", {}).get("drinks", [])
        if drinks:
            opt_drink = find_or_create_option("Boisson", product_id)
            if opt_drink:
                opt_id = opt_drink["id"]
                for d in drinks:
                    find_or_create_choiceoption(d["name"], d.get("price", 0.0), opt_id)

        # 4. Side (menus) -> option "Side"
        sides = prod.get("options", {}).get("side", [])
        if sides:
            opt_side = find_or_create_option("Side", product_id)
            if opt_side:
                opt_id = opt_side["id"]
                for s in sides:
                    find_or_create_choiceoption(s["name"], s.get("price", 0.0), opt_id)

        # 5. Sizes -> option "Taille"
        sizes = prod.get("options", {}).get("sizes", [])
        if sizes:
            opt_size = find_or_create_option("Taille", product_id)
            if opt_size:
                opt_id = opt_size["id"]
                for s in sizes:
                    find_or_create_choiceoption(s["name"], s.get("price", 0.0), opt_id)

    print("✅ Seed complet terminé. Vérifie dans /docs que tout est en place.")

if __name__ == "__main__":
    seed()
