const rewire = require("rewire")
const script = rewire("./script")
const getWeather = script.__get__("getWeather")
// @ponicode
describe("getWeather", () => {
    test("0", () => {
        let callFunction = () => {
            getWeather("Brussels")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getWeather("New York")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getWeather("Casablanca")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getWeather("Roma")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getWeather("Paris")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getWeather(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
