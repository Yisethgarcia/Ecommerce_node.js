import { client, main } from '../helpers/db.js';

export class Productdata {
    constructor() {
        this.db = null;
        this.Products = null;
    }

    static connect = async()=> {
        this.db = await main();
        this.Products = this.db.collection('Products');

        const data = [
                {
                    code: "P001",
                    name: "Consola XPower Pro",
                    image: "https://www.kinhank-retrogame.com/cdn/shop/products/1_1_1024x1024.jpg?v=1598679976",
                    category: "GAMR",
                    price: 499.99,
                    active: true
                },
                {
                    code: "P002",
                    name: "Auriculares Gamer RGB",
                    image: "https://tiendaexo.com/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/a/u/auriculares-eksa-e1000.jpg",
                    category: "GAMR",
                    price: 89.90,
                    active: true
                },
                {
                    code: "P003",
                    name: "Smartphone Nova X",
                    image: "https://www.pngwing.com/pngs/678/100/png-transparent-huawei-nova-2-smartphone-huawei-nova-3-huawei-p20-huawei-nova-2s-huawei-nova-3e-mobile-phone.png",
                    category: "SMRT",
                    price: 699.00,
                    active: true
                },
                {
                    code: "P004",
                    name: "Cargador Inalámbrico 15W",
                    image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-3d-universal-fast-wireless-charger-15w-on-transparent-background-png-image_13085758.png",
                    category: "SMRT",
                    price: 24.50,
                    active: true
                },
                {
                    code: "P005",
                    name: "Chaqueta de Cuero",
                    image: "https://www.stickpng.com/assets/images/5a212b6e84063b0d4c5f2f4e.png",
                    category: "FASH",
                    price: 129.95,
                    active: true
                },
                {
                    code: "P006",
                    name: "Zapatos Urbanos",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-sneaker-shoes-png-image_5570743.jpg",
                    category: "FASH",
                    price: 74.99,
                    active: true
                },
                {
                    code: "P007",
                    name: "Sofá Modular de 3 Plazas",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-modern-sofa-png-image_5570741.jpg",
                    category: "FURN",
                    price: 899.00,
                    active: false
                },
                {
                    code: "P008",
                    name: "Mesa de Comedor Extensible",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-dining-table-png-image_5570742.jpg",
                    category: "FURN",
                    price: 499.00,
                    active: false
                },
                {
                    code: "P009",
                    name: "Set de Herramientas de Jardín",
                    image: "https://www.pngwing.com/pngs/100/100/png-transparent-gardening-tools-garden-tools-garden-tools.png",
                    category: "GRDN",
                    price: 39.95,
                    active: true
                },
                {
                    code: "P010",
                    name: "Silla de Exterior Plegable",
                    image: "https://www.pngwing.com/pngs/100/100/png-transparent-folding-chair-chair-furniture-chair.png",
                    category: "GRDN",
                    price: 29.99,
                    active: true
                },
                {
                    code: "P011",
                    name: "Coche para Bebé 3 en 1",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-baby-stroller-png-image_5570744.jpg",
                    category: "KIDS",
                    price: 349.00,
                    active: true
                },
                {
                    code: "P012",
                    name: "Juguete Interactivo Educativo",
                    image: "https://www.pngwing.com/pngs/100/100/png-transparent-educational-toy-toy-educational-toy.png",
                    category: "KIDS",
                    price: 45.00,
                    active: true
                },
                {
                    code: "P013",
                    name: "Suscripción Premium Streaming",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-streaming-service-png-image_5570745.jpg",
                    category: "SUBS",
                    price: 9.99,
                    active: false
                },
                {
                    code: "P014",
                    name: "Curso Online de Fotografía",
                    image: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-online-photography-course-png-image_5570746.jpg",
                    category: "SUBS",
                    price: 49.99,
                    active: false
                }
            ];

        try {
            let result = await this.Products.insertMany(data);
            console.log('Inserted Products');
            console.log(result);
            
        }catch ({writeErrors, ...error}) {
            const { 
                errInfo: {details:{schemaRulesNotSatisfied}}
            } = writeErrors[0].err;
            console.log(schemaRulesNotSatisfied);
        } finally {
            await client.close();
        }
    }
}

    