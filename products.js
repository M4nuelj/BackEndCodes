const fs=require("fs");


class ProductManager{
    constructor(){
        this.product=[];

        if(!fs.existsSync("productManager.json")){

            fs.writeFileSync("productManager.json", "[]")
            const stringFile = fs.readFileSync("productManager.json", "utf-8");
            this.product=JSON.parse(stringFile);

        }else{

            const stringFile= fs.readFileSync("productManager.json", "utf-8");
            fs.writeFileSync("productManager.json",stringFile, null, 2);
            this.product=JSON.parse(stringFile);

        }

    }
    addProduct(productList) {
        const {
            title,
            description,
            price, 
            thumbnail, 
            code, 
            stock}=productList

        if(!title||!description||!price||!thumbnail||!code||!stock){
            console.log("You have to complete all the information about the prioduct")
        }

        const id= Math.floor(Math.random()*10000000);
        const product={id, title, description, price, thumbnail, code, stock};
        const codeProduct=this.product.find((x)=>x.code===product.code);

        if(!codeProduct){

            this.product.push(product);
            const stringFile=JSON.stringify(this.product, null, 2);
            fs.writeFileSync("productManager.json", stringFile);
            return `We added the product "${product.title}" successfully`

        }else{
            return `The product "${codeProduct.title}" already exist, please verify the information and try again`
        }
        
    }

    getAllProducts(){
        console.log(this.product)
        return 
    };

    getProduct(id){

        let findProduct= this.product.find(product=>product.id===id);
        if(!findProduct){
            return "El producto ingresado no existe"
        }else{
            return findProduct;
        }

    }
    updateProduct(id, change){

        let findProduct= this.product.findIndex(product=>product.id===id);
        if(findProduct===-1){
            return 'The product that you are requesting for does not exist, plase try again'
        }
        
        let newProduct=this.product[findProduct];
        let updatedProduct={...newProduct, ...change};
        this.newProduct[findProduct]=updatedProduct;
        fs.writeFileSync('productManager.json', JSON.stringify(this.product, null, 2));

        return updatedProduct;

    }
    deleteProduct(id){
        let findProduct= this.product.findIndex(x=>x.id===id);
        if(findProduct===-1){
            return 'This product does not exist'
        }
        let deletedProduct=this.product.filter(x=>x.id!==id)
        fs.writeFileSync('productManager.json', JSON.stringify(deletedProduct, null, 2));
        return `the product ${this.product[findProduct].title} was deleted`
    }

};

const productManager =new ProductManager();
// productManager.addProduct({ title:'Mango', description:'Fruit', price:2000, thumbnail:'NA', code:'abd234', stock:45});
// console.log(productManager.addProduct({ title:'Apple', description:'Fruit', price:3000, thumbnail:'NA', code:'abd444', stock:48  }))
// productManager.getAllProducts()
// console.log(productManager.getProduct(7819587));
// console.log(productManager.deleteProduct(9041528));
