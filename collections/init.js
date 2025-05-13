import { CategoryService } from './categories.js';
import { PaymentMethodService } from './paymentMethods.js';
import { ProductService } from './products.js';
import { SalesService } from './sales.js';
import { UserService } from './users.js';

import { Categorydata } from '../data/categories.js';
import { PaymentMethodata } from '../data/paymentMethods.js';
import { Productdata } from '../data/products.js';
import { Salesdata } from '../data/sales.js';
import { Usersdata } from '../data/users.js';

const setup = async () => {
    try {
        const categoryService = new CategoryService();
        await categoryService.createCategoriesCollection();

        const paymentMethodService = new PaymentMethodService();
        await paymentMethodService.createPaymentMethodsCollection();

        const productService = new ProductService();
        await productService.createProductsCollection();

        const salesService = new SalesService();
        await salesService.createSalesCollection();

        const userService = new UserService();
        await userService.createUsersCollection();

        //Datos
        await Categorydata.connect();
        await PaymentMethodata.connect();
        await Productdata.connect();
        await Salesdata.connect();
        await Usersdata.connect();


        console.log('All collections were created successfully');
    } catch (error) {
        console.error('Error creating collections:', error);
    }
};

setup();