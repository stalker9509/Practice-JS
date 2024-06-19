class Book{
    constructor(name, author, year) {
        this.name = name
        this.author = author
        this.year = year
    }

    information(){
        return `Book ${this.name} is author ${this.author}, published ${this.year}`
    }
}

class Ebook extends Book{
    constructor(name, author, year, coast){
        super(name, author, year)
        this.coast = coast
    }
    information(){
        return `Book ${this.name} is author ${this.author}, published ${this.year}, coast ${this.coast}`
    }
}

const ebook = new Ebook("The Witcher", "Sapkowski", 1986, 10)
console.log(ebook.information())