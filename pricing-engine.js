(function(){
const defaults={igv:18,minMargin:28,targetMargin:40,operatorRate:110,supervisorRate:220,coordinatorRate:300,pdaRate:110};
function calculate(i,settings={},service={base:.12,min:950,marketMin:.10,marketMax:.20,unit:'producto'}){
 const s={...defaults,...settings}, n=k=>Number(i[k]||0);
 const complexity={Baja:.95,Media:1.08,Alta:1.22,Crítica:1.4}[i.complexity]||1;
 const shift={Diurno:1,Nocturno:1.18,Mixto:1.1}[i.shift]||1;
 const urgency={Normal:1,Prioritaria:1.08,Urgente:1.18}[i.urgency]||1;
 const sites=1+Math.max(0,n('sites')-1)*.06;
 const labor=(n('operators')*s.operatorRate+n('supervisors')*s.supervisorRate+n('coordinators')*s.coordinatorRate)*Math.max(1,n('days'));
 const equipment=n('pdas')*s.pdaRate*Math.max(1,n('days'));
 const direct=n('mobility')+n('food')+n('lodging')+n('materials')+n('other');
 const volume=Math.max(Number(service.min||0),n('quantity')*Number(service.base||0));
 const raw=Math.max(volume,labor+equipment+direct);
 const cost=raw*complexity*shift*urgency*sites;
 const margin=Math.max(Number(s.minMargin||0),n('margin')||Number(s.targetMargin||0))/100;
 const subtotal=cost/(1-margin), igv=subtotal*Number(s.igv||18)/100, total=subtotal+igv, unit=subtotal/Math.max(1,n('quantity'));
 const productivePeople=Math.max(1,n('operators'));
 const secondsPerProduct=Math.max(.1,Number(i.secondsPerProduct||1));
 const theoreticalSeconds=n('quantity')*secondsPerProduct/productivePeople;
 const theoreticalHours=theoreticalSeconds/3600;
 const operationalEfficiency=Math.min(1,Math.max(.35,Number(i.operationalEfficiency||.75)));
 const operationalHours=theoreticalHours/operationalEfficiency;
 const workdayHours=Math.max(1,Number(i.workdayHours||8));
 const estimatedWorkdays=operationalHours/workdayHours;
 const plannedDays=Math.max(1,n('days'));
 const requiredOperators=Math.max(1,Math.ceil((n('quantity')*secondsPerProduct)/(operationalEfficiency*3600*workdayHours*plannedDays)));
 const plannedCapacity=productivePeople*operationalEfficiency*3600*workdayHours*plannedDays/secondsPerProduct;
 const capacityCoverage=Math.min(999,plannedCapacity/Math.max(1,n('quantity'))*100);
 const planIsFeasible=productivePeople>=requiredOperators;
 return {cost,subtotal,igv,total,unit,labor,equipment,direct,volume,factor:complexity*shift*urgency*sites,theoreticalSeconds,theoreticalHours,operationalHours,estimatedWorkdays,productivePeople,secondsPerProduct,operationalEfficiency,workdayHours,plannedDays,requiredOperators,plannedCapacity,capacityCoverage,planIsFeasible};
}
function inferPublic({quantity=3000,sites=1,shift='Diurno',complexity='Media',service='SER-001'}){
 const q=Number(quantity),days=Math.max(1,Math.ceil(q/8000)),operators=Math.max(2,Math.ceil(q/(3500*days))),supervisors=Math.max(1,Math.ceil(operators/8)),coordinators=sites>=4?1:0,pdas=operators+supervisors;
 const catalog={
 'SER-001':{base:.12,min:950,marketMin:.10,marketMax:.20,unit:'producto',name:'Inventario físico de mercadería'},
 'SER-002':{base:.18,min:1400,marketMin:.15,marketMax:.28,unit:'producto',name:'Auditoría de inventarios'},
 'SER-003':{base:.65,min:1800,marketMin:.50,marketMax:1.10,unit:'activo',name:'Inventario de activos fijos'}
 };
 const input={quantity:q,sites,shift,complexity,urgency:'Normal',days,operators,supervisors,coordinators,pdas,mobility:300*sites,food:(operators+supervisors+coordinators)*25*days,lodging:0,materials:0,other:100,margin:40};
 return {...calculate(input,{},catalog[service]),...input,serviceData:catalog[service]};
}
window.AGPPricing={calculate,inferPublic};
})();