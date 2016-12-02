import { map, uniqBy, filter } from 'lodash'

export function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function getOrigins(props) {

   let options = props.options;

   if (props.destinCode !== "") {
     options = filter(options, {destinationCode: props.destinCode});
   }

   let origins = map(options, (itm) => {
     return {
       label: itm.originName,
       value: itm.originCode
     };
   });

   origins = uniqBy(origins, 'value');
   return origins;
 }

 export function getDestinations(props, extra = [], origin) {

   let options = props.options;

   if (props.originCode !== "") {
     options = filter(options, {originCode: props.originCode});
   }

   let destins = map(options, itm => {
     return {
       label: itm.destinationName,
       value: itm.destinationCode
     }
   });

   destins = uniqBy(destins, 'value');
   return destins;
 }
