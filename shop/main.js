var Checkout = require('./lib/checkout');

var pricingRules = [
  {name: 'freeItemPerQtyPricingRule', productSku: 'cari', qty: 3},
  {name: 'bulkBuyDiscountPricingRule', productSku: 'homi', qty: 5, discount: 50},
  {name: 'freeItemWithOtherItemPricingRule', paidProductSku: 'heai', freeProductSku: 'peti'}
];

var test1 = new Checkout(pricingRules);
    test1.scan('cari');
    test1.scan('cari');
    test1.scan('cari');
    test1.scan('peti');

console.log('SKUs Scanned: cari, cari, cari, peti');
console.log('Total expected: ', test1.total());
console.log('\n');

var test2 = new Checkout(pricingRules);
    test2.scan('cari');
    test2.scan('homi');
    test2.scan('homi');
    test2.scan('cari');
    test2.scan('homi');
    test2.scan('homi');
    test2.scan('homi');

console.log('SKUs Scanned: cari, homi, homi, cari, homi, homi, homi');
console.log('Total expected: ', test2.total());
console.log('\n');


var test3 = new Checkout(pricingRules);
    test3.scan('heai');
    test3.scan('peti');
    test3.scan('homi');

console.log('SKUs Scanned: heai, peti, homi');
console.log('Total expected: ', test3.total());
console.log('\n');
