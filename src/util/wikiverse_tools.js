import { data } from "../data/WikidItMyself.json"

class WikiverseTools {

  constructor() {
    this.data = data
  }

  getWikiverseData() {
    return this.data
  }

  sayHello() {
    console.log("Hello from WikiverseTools")
  }

}
