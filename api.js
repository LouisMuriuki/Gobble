import sanityClient from "./sanity";
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(`
    *[_type=='featured']{
        ...,
            restaurants[]->{
          ...,
          
          categories[]->{
            ..., items[]->{
            ...,
          },
          },
                
        }
      }
    `);
};
export const getRestaurants = () => {
  return sanityQuery(`
  *[_type=='restaurant']{
    ...,
     categories[]->{
               ...,items[]->{
               ...,
             },
             },
             
       
   }
    `);
};

export const getCategories = () => {
  return sanityQuery(`
  *[_type=='categories']{
    name,image,_id
  }
  
    `);
};

export const getFeaturedResturantById = (id) => {
  return sanityQuery(
    `
        *[_type == 'featured' && _id == $id] {
            ...,
            resturants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]
    `,
    { id }
  );
};
