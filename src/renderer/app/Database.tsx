import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { remote } from 'electron';
import Database from '../../main/database/Database';

export const Application: React.FC<{}> = () => {
    const database: Database = remote.getGlobal('database');

    console.log(database);

    const [data, setData] = useState([]);

    async function insertToDatabase() {
        const insert = await database.insert('First Name', 'Last Name');

        // console.log('Insert: ');
        // console.table(insert);
        // console.log('Fetch: ');
        // console.table(await database.fetchAll());

        setData(await database.fetchAll());
    }

    async function showDatabase() {
        // const insert = await database.insert('First Name', 'Last Name');

        // console.log('Insert: ');
        // console.table(insert);
        // console.log('Fetch: ');
        // console.table(await database.fetchAll());

        if (data.length <= 0) {
            setData(await database.fetchAll());
        }
    }

    showDatabase();

    return (
        <div>
            <button onClick={() => insertToDatabase()}>test</button>
            {data.map((d) => {
                return (
                    <div key={d.key}>
                        <h1>Name: {d.name}</h1>
                        <h2>Surname: {d.surname}</h2>
                    </div>
                );
            })}
        </div>
    );
};

export default hot(Application);
