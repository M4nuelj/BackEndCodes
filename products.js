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
    async addProduct(productList) {
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
            fs.writeFileSync("productManager.Json", stringFile);

        }else{
            console.log("This product already exist, please verify the information and try again")
            return
        }

        
    }



};

const productManager =new ProductManager();
// productManager.addProduct({ title:'Mango', description:'Fruit', price:2000, thumbnail:'NA', code:'abd234', stock:45});
// productManager.addProduct({ title:'Apple', description:'Fruit', price:3000, thumbnail:'NA', code:'abd444', stock:48  });
