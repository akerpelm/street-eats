import { CollectionConfig } from "payload";

const MenuItem: CollectionConfig = {
  slug: 'menuItems',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      maxLength: 300,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'spiceLevel',
      type: 'select',
      options: [
        'None',
        'Mild',
        'Medium',
        'Hot',
        'Extra Hot',
        'You Pick'
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Starters',
        'Main',
        'Salads',
        'Desserts',
        'Drinks',
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'glutenFree',
      type: 'checkbox',
      label: 'Gluten Free',
    },
    {
      name: 'vegan',
      type: 'checkbox',
      label: 'Vegan',
    },
    {
      name: 'vegetarian',
      type: 'checkbox',
      label: 'Vegetarian',
    },
    {
      name: 'allergens',
      type: 'select',
      options: [
        'Nuts',
        'Dairy',
        'Soy',
        'Gluten',
        'Eggs',
        'Shellfish',
        'Fish',
      ],
      hasMany: true,
    },
    {
      name: 'calories',
      type: 'number',
    },
  ],
};

export default MenuItem;