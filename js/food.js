class Food{
    constructor(){
        this.foodStock =0;
        this.lastFed;
        this.milkImg = loadImage("images/Milk.png");
    }
    
    getFoodStock(){
        return this.foodStock;
    }  

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }
    
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    display(){
        if(lastFed != undefined){
            textSize(15);
            if(lastFed >= 12){
                text("Last Feed :  "+ lastFed%12 + "PM" , 300,115);
            }
            else if(lastFed == 0){
                text("Last Feed 12 AM", 300,100);
            }
            else
            {
                text("Last Feed :  "+ lastFed + "AM" , 300,115);
            }
        }
        console.log(this.foodStock);
        //Display milk bottle w.r.t. stock
        var x=70,y=100; 
        imageMode(CENTER);
        if(this.foodStock != 0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=70;
                    y=y+50;
                  }
                  image(this.milkImg,x,y,50,50);
                  x=x+30;
            }
        }
    }
}