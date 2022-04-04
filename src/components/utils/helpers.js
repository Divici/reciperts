const outJoiner = '*0uT7o1n3r*'
const inJoiner = '-1n8J0i2e4-'

export const makeIngredientsArray = (string) => {
    let ingArr = []
    if(string && string.length > 0){
        const outerArray = string.split(outJoiner)
        outerArray.shift()
        outerArray.forEach(ingStr => {
            let inner = ingStr.split(inJoiner)
            let ingObj = {
                quantity: Number(inner[0]),
                ingredient_unit : inner[1],
                ingredient_name: inner[2],
                ing_id : Math.floor(Date.now()/1000)
            }
            ingArr.push(ingObj)
        })
    }
    
    return ingArr
}

export const makeIngredientsString = (array) => {
    if(array && array.length > 0){
        let ingStr = ''
        array.forEach(ing=>{
            ingStr += 
            outJoiner + ing.quantity.toString() 
            + inJoiner + ing.ingredient_unit 
            + inJoiner + ing.ingredient_name
        })

        return ingStr
    }
    return ''
}