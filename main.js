//Ex 1
let command = "create table author (id number, name string, age number, city string, state string, country string)";
let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
let evaluatedExp = exp.exec(command)
let tableName = evaluatedExp[1];
let columns = evaluatedExp[2];
columns = columns.split(/,\s/);
console.log(tableName, columns);

//Ex 2
let database = {
    tables : {
    }

};

database.tables[tableName] = {
    columns : {}
};

columns.forEach(column =>{
    let [name,value] = column.split(" ");
    database.tables[tableName].columns[name] = value;
    console.log(database.tables[tableName].columns)
});

console.log(JSON.stringify(database));


