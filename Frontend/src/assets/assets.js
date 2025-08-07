import logo from './logo.png'
import search_icon from './search_icon.png'
import basket_icon from './basket_icon.png'
import header_img from './header_img.png'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import linkedin_icon from './linkedin_icon.png'
import cross_icon from './cross_icon.png'

import menu_1 from './menu_1.jpg'
import menu_2 from './menu_2.jpg'
import menu_3 from './menu_3.jpg'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.jpg'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.jpg'
import menu_8 from './menu_8.jpg'


import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

export const assets = {
  logo,
  search_icon,
  basket_icon,
  header_img,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  facebook_icon,
  twitter_icon,
  linkedin_icon,
  cross_icon
}

export const restaurant_list = [
    {
        restaurant_name: "Annakoot",
        restaurant_image: menu_1,
        location: "Paknajol Marg",
        contact: "01-1234567"
    },
    {
        restaurant_name: "Spice Route",
        restaurant_image: menu_2,
        location: "Thamel",
        contact: "01-2345678"
    },
    {
        restaurant_name: "ANGAN",
        restaurant_image: menu_3,
        location: "Lazimpat",
        contact: "01-3456789"
    },
    {
        restaurant_name: "Sandwich Point",
        restaurant_image: menu_4,
        location: "Chaksibati Marg",
        contact: "01-4567890"
    },
    {
        restaurant_name: "Italian Bakery",
        restaurant_image: menu_5,
        location: "Saraswati Nagar",
        contact: "01-5678901"
    },
    {
        restaurant_name: "Always Happy Food",
        restaurant_image: menu_6,
        location: "Paknajol",
        contact: "01-6789012"
    },
    {
        restaurant_name: "Sicily By Ts",
        restaurant_image: menu_7,
        location: "Thapathali",
        contact: "01-7890123"
    },
    {
        restaurant_name: "Sanchyan Ramen",
        restaurant_image: menu_8,
        location: "Durbar Marg",
        contact: "01-8901234"
    }]

export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: food_1,
        price: 12,
        description: "A refreshing mix of crisp cucumbers, juicy tomatoes, olives, and feta cheese.",
        restaurant: "Annakoot"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: food_2,
        price: 18,
        description: "A healthy blend of seasonal vegetables tossed in a light vinaigrette.",
        restaurant: "Annakoot"
    },
    {
        _id: "3",
        name: "Clover Salad",
        image: food_3,
        price: 16,
        description: "A unique medley of clover greens, sprouts, and zesty lemon dressing.",
        restaurant: "Annakoot"
    },
    {
        _id: "4",
        name: "Chicken Salad",
        image: food_4,
        price: 24,
        description: "Grilled chicken served over a bed of lettuce with tangy dressing.",
        restaurant: "Annakoot"
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: food_5,
        price: 14,
        description: "Rolled pasta sheets filled with ricotta and spinach, baked in marinara sauce.",
        restaurant: "Spice Route"
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: food_6,
        price: 12,
        description: "Spicy peri peri-flavored veggie filling rolled in soft flatbread.",
        restaurant: "Spice Route"
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        image: food_7,
        price: 20,
        description: "Tender chicken chunks wrapped in a warm roll with tangy sauces.",
        restaurant: "Spice Route"
    },
    {
        _id: "8",
        name: "Veg Rolls",
        image: food_8,
        price: 15,
        description: "Crunchy vegetables and spicy chutney rolled in a soft paratha.",
        restaurant: "Spice Route"
    },
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: food_9,
        price: 14,
        description: "Creamy vanilla ice cream swirled with fruity ripple flavors.",
        restaurant: "ANGAN"
    },
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: food_10,
        price: 22,
        description: "Rich and creamy ice cream bursting with real fruit chunks.",
        restaurant: "ANGAN"
    },
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: food_11,
        price: 10,
        description: "Delicious layers of ice cream, cake, and toppings served in a jar.",
        restaurant: "ANGAN"
    },
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: food_12,
        price: 12,
        description: "Classic vanilla ice cream made from real vanilla beans.",
        restaurant: "ANGAN"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: food_13,
        price: 12,
        description: "Grilled chicken breast served between toasted bread with mayo.",
        restaurant: "Sandwich Point"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: food_14,
        price: 18,
        description: "Plant-based patty and veggies in a multigrain sandwich bun.",
        restaurant: "Sandwich Point"
    },
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: food_15,
        price: 16,
        description: "Golden brown grilled sandwich filled with cheese and veggies.",
        restaurant: "Sandwich Point"
    },
    {
        _id: "16",
        name: "Bread Sandwich",
        image: food_16,
        price: 24,
        description: "Simple yet tasty sandwich with spiced mashed potatoes and buttered bread.",
        restaurant: "Sandwich Point"
    },
    {
        _id: "17",
        name: "Cup Cake",
        image: food_17,
        price: 14,
        description: "Soft and fluffy mini cake topped with rich, creamy frosting.",
        restaurant: "Italian Bakery"
    },
    {
        _id: "18",
        name: "Vegan Cake",
        image: food_18,
        price: 12,
        description: "Dairy-free and egg-free cake with moist texture and bold flavors.",
        restaurant: "Italian Bakery"
    },
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: food_19,
        price: 20,
        description: "Moist sponge layered with butterscotch cream and caramel drizzle.",
        restaurant: "Italian Bakery"
    },
    {
        _id: "20",
        name: "Sliced Cake",
        image: food_20,
        price: 15,
        description: "Freshly cut cake slices in assorted flavors for a quick treat.",
        restaurant: "Italian Bakery"
    },
    {
        _id: "21",
        name: "Garlic Mushroom",
        image: food_21,
        price: 14,
        description: "Sauteed mushrooms tossed in garlic butter and herbs.",
        restaurant: "Always Happy Food"
    },
    {
        _id: "22",
        name: "Fried Cauliflower",
        image: food_22,
        price: 22,
        description: "Crispy fried cauliflower florets served with spicy dip.",
        restaurant: "Always Happy Food"
    },
    {
        _id: "23",
        name: "Mix Veg Pulao",
        image: food_23,
        price: 10,
        description: "Aromatic basmati rice cooked with a variety of vegetables and spices.",
        restaurant: "Always Happy Food"
    },
    {
        _id: "24",
        name: "Rice Zucchini",
        image: food_24,
        price: 12,
        description: "Zucchini and rice stir-fried with light seasoning and herbs.",
        restaurant: "Always Happy Food"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: food_25,
        price: 12,
        description: "Creamy pasta coated in melted cheese and Italian herbs.",
        restaurant: "Sicily By Ts"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: food_26,
        price: 18,
        description: "Pasta tossed in tangy tomato sauce with fresh basil.",
        restaurant: "Sicily By Ts"
    },
    {
        _id: "27",
        name: "Creamy Pasta",
        image: food_27,
        price: 16,
        description: "Rich and smooth white sauce pasta with mushrooms and cheese.",
        restaurant: "Sicily By Ts"
    },
    {
        _id: "28",
        name: "Chicken Pasta",
        image: food_28,
        price: 24,
        description: "Savory chicken chunks mixed in spicy pasta sauce and penne.",
        restaurant: "Sicily By Ts"
    },
    {
        _id: "29",
        name: "Butter Noodles",
        image: food_29,
        price: 14,
        description: "Soft noodles stir-fried with garlic and a generous dose of butter.",
        restaurant: "Sanchyan Ramen"
    },
    {
        _id: "30",
        name: "Veg Noodles",
        image: food_30,
        price: 12,
        description: "Classic stir-fried noodles with crunchy vegetables and soy sauce.",
        restaurant: "Sanchyan Ramen"
    },
    {
        _id: "31",
        name: "Somen Noodles",
        image: food_31,
        price: 20,
        description: "Thin Japanese-style noodles served cold with dipping sauce.",
        restaurant: "Sanchyan Ramen"
    },
    {
        _id: "32",
        name: "Cooked Noodles",
        image: food_32,
        price: 15,
        description: "Hearty bowl of noodles simmered in flavorful broth and spices.",
        restaurant: "Sanchyan Ramen"
    }
];
