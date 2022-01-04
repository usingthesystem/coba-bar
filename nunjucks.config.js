const fs = require('fs')
const menu = require('./menu.json')

const loadMenu = () => {
  let allIngredients = []
  const allCategories = []
  const drinksByCategory = {}
  for (const drink of menu.drinks) {
    if (drink.ingredients) {
      allIngredients = allIngredients.concat(drink.ingredients)
    }
    if (drink.category) {
      allCategories.push(drink.category)
      if (!(drink.category in drinksByCategory)) {
        drinksByCategory[drink.category] = []
      }
      drink.price = Number(drink.price).toFixed(1)
      drinksByCategory[drink.category].push(drink)
    }
  }
  const allIngredientsUnique = allIngredients
    .filter((item, pos) => allIngredients.indexOf(item) === pos)
    .sort()

  const allCategoriesUnique = allCategories
    .filter((item, pos) => allCategories.indexOf(item) === pos)
    .sort()

  const report = {
    allDrinksByCategory: drinksByCategory,
    ingredients: allIngredientsUnique,
    categories: allCategoriesUnique
  }
  const jsonDataString = JSON.stringify(report, null, 2)
  fs.writeFileSync('./report.json', jsonDataString)
  return {
    menu,
    report
  }
}

module.exports = {
  data: loadMenu()
}
