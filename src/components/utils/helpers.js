import { v4 as uuid } from 'uuid';

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
                ing_id : uuid().slice(0,8)
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

export const makeStepsArray = (string) => {
    let stepArr = []
    if(string && string.length > 0){
        const outerArray = string.split(outJoiner)
        outerArray.shift()
        outerArray.forEach(stepStr => {
            let stepObj = {
                step_name: stepStr,
                step_id : uuid().slice(0,8)
            }
            stepArr.push(stepObj)
        })
    }
    
    return stepArr
}

export const makeStepsString = (array) => {
    if(array && array.length > 0){
        let stepStr = ''
        array.forEach(step=>{
            stepStr += outJoiner + step.step_name 
        })

        return stepStr
    }
    return ''
}