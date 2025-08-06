// CART
function getCart(){return JSON.parse(localStorage.getItem("cart"))||[];}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c));}

function addToCart(i){
 let products=[...Array(20)].map((_,x)=>items[x]); 
 let c=getCart();
 let find=c.find(x=>x.name===items[i].name);
 if(find) find.qty+=1;
 else c.push({name:items[i].name,price:items[i].price,qty:1});
 saveCart(c);
 alert("Added!");
 showCount();
}

function showCount(){
 document.querySelectorAll('#cart-total').forEach(el=>{
   el.innerText=getCart().reduce((a,b)=>a+b.qty,0);
 });
}
showCount();

window.onload=()=>{
 if(document.getElementById("cart-items")){
  let c=getCart(),h="";
  if(!c.length){document.getElementById("cart-items").innerHTML="Cart empty";return;}
  c.forEach((i,idx)=>{
   h+=`<div class='card'>
   <h3>${i.name}</h3>
   <p>₹${i.price} x <input style="width:50px" value="${i.qty}" onchange="updateQty(${idx},this.value)"></p>
   <p>Subtotal ₹${i.price*i.qty}</p>
   <button onclick="removeItem(${idx})">Remove</button>
   </div>`;
  });
  h+=`<h3>Total: ₹${c.reduce((a,b)=>a+b.price*b.qty,0)}</h3>`;
  document.getElementById("cart-items").innerHTML=h;
  document.getElementById("payAmt") && (document.getElementById("payAmt").innerText=c.reduce((a,b)=>a+b.price*b.qty,0));
 }
}

function updateQty(i,v){
 let c=getCart();c[i].qty=parseInt(v);saveCart(c);location.reload();
}
function removeItem(i){let c=getCart();c.splice(i,1);saveCart(c);location.reload();}

function placeOrder(){
 let c=getCart();
 let order={id:Math.floor(Math.random()*10000),amount:c.reduce((a,b)=>a+b.price*b.qty,0),status:"Placed"};
 localStorage.setItem("order",JSON.stringify(order));
 localStorage.removeItem("cart");
 window.location="success.html";
}
