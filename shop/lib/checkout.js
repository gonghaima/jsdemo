
    var Checkout = function (pricingRules) {
      
      if (!pricingRules || !(pricingRules instanceof Array)) //must 
           throw new Error('invalidate params');

      this._catalogue = [ 
          { name: 'homi', price : 549.99},
          { name: 'heai', price: 1399.99}, 
          { name: 'cari', price : 109.50},
          { name: 'peti', price: 30.00}
        ];
      this._arrPricingRules = pricingRules; 
      this._items = [];
  };

  Checkout.prototype.scan = function(sku) {
     var product = this._catalogue.find(function(i){
        return i.name === sku;
     });
     this._items.push(product);
  }

  Checkout.prototype.total = function() {
     var subtotal = 0;
     var discount = 0;
     
     for (var i=0; i<this._items.length; i++) {
        subtotal += this._items[i].price;
      };

      for( var j=0; j<this._arrPricingRules.length; j++){
        var rule = this._arrPricingRules[j];
       
        if(rule.name === 'freeItemPerQtyPricingRule') {
          var product = this._catalogue.find(function(ele){
            return ele.name === rule.productSku;
           }); 
          var count = 0;
          for(var m=0; m<this._items.length; m++){
            if(this._items[m].name === rule.productSku) {
              count++;
            }
          }

          discount += parseInt(count / rule.qty) * product.price;
        }
        if(rule.name === 'bulkBuyDiscountPricingRule') {
          var product = this._catalogue.find(function(ele){
            return ele.name === rule.productSku;
           }); 
          var count = 0;
          for(var m=0; m<this._items.length; m++){
            if(this._items[m].name === rule.productSku) {
              count++;
            }
          }
          if(count >= rule.qty)
            discount += count  * rule.discount;
        }
        if(rule.name === 'freeItemWithOtherItemPricingRule') {
          var paidProduct = this._catalogue.find(function(ele){
            return ele.name === rule.paidProductSku;
           }); 
          var freeProduct = this._catalogue.find(function(ele){
            return ele.name === rule.freeProductSku;
           }); 

          var countPaid = 0;
          var countFree = 0;
          for(var m=0; m<this._items.length; m++){
            if(this._items[m].name === rule.paidProductSku) {
              countPaid++;
            }
            if(this._items[m].name === rule.freeProductSku) {
              countFree++;
            }
          }
         
          discount += Math.min(countPaid, countFree) * freeProduct.price;
        }
      }
       

    
     return subtotal - discount;
  }

module.exports = Checkout;