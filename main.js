let Database = function () {
    tables : {},
    this.execute(command){

        this.execute = function (command) {
            if (statement.startsWith("create table")) return createTable(command);
            if (statement.startsWith("insert")) return insert(command);
            if (statement.startsWith("select")) return select(command);
        }


        function createTable (command) {
            let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
            let evaluatedExp = exp.exec(command)
            let tableName = evaluatedExp[1];
            this.tables[tableName] = {
                columns: {},
                data: []
            }
            let columns = evaluatedExp[2];
            columns = columns.split(/,\s/);
            columns.forEach(column => {
                let [name, value] = column.split(" ");
                database.tables[tableName].columns[name] = value;
            });
        }

        function insert (command) {
            let exp = /insert into ([a-z]+) \(([a-z,\s]+)\) values \(([a-zA-Z0-9,\s]+)\)/;
            let evaluatedExp = exp.exec(command);
            let [undefined, tableName, columns, values] = evaluatedExp;
            columns = columns.replace(/(\(|\))/g, "").split(",");
            values = values.replace(/(\(|\))/g, "").split(",");
            let row = {};
            for(let i = 0; i < columns.length; i++) {
                row[columns[i].trim()] = values[i].trim();
            }
            console.log(evaluatedExp);
            this.tables[tableName].data.push(row);
        }

        function select (command) {
            let exp = /select (([a-z\s,]+)) from (([a-z\s,]+))/;
            let [undefined, columns, tableName] = parsedStatement;
            columns = columns.split(",");
            if (!(tableName in tables)) throw `A tabela ${tableName} não existe`;
            var results = [];
            for(let row of tables[tableName].data) {
                var result = {};
                for(let column of columns) {
                    column = column.trim();
                    if (!(column in tables[tableName].columns)) throw `A coluna ${column} não existe`;
                    Object.assign(result, {[column]: row[column]});
                }
                results.push(result);
            }
            return results;
        }
    }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
database.execute("select id, name, age from author");

console.log(JSON.stringify(database));

