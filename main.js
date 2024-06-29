'use strict';

/**
 * Wrapper record class used for holding db results
 */
class Info {
    year;
    outdatedTechnologies;

    constructor(year, content) {
        this.year = year;
        this.outdatedTechnologies = content.outdatedTechnologies;
    }
}

/**
 * Pseudo DB Driver class used for retrieving DB results
 */
class DBDriver {
    async getInfoForYear(year) {
        const response = await fetch(`./db/${year}.json`);
        if (!response.ok) {
            throw new Error("Problem connecting with db");
        }

        const content = await response.json();
        return new Info(year, content);
    }
}

/**
 * Main
 */
const yearInput = document.getElementById('yearInput');
const searchBtn = document.getElementById('searchBtn');
const outdatedInformationList = document.getElementById('outdatedInformationList');


const db = new DBDriver();
searchBtn.addEventListener('click', async () => {
    const year = yearInput.value.trim();
    if (year === '') return;

    // Clear list
    outdatedInformationList.innerHTML = '';
    try {
        const info = await db.getInfoForYear(year);
        info.outdatedTechnologies.forEach((value) => {
            const li = document.createElement('li');
            li.textContent = value;
            outdatedInformationList.appendChild(li);
        })
    } catch (e) {
        console.error(e);
        alert(`Year=${year} not found in DB.`);
    }
});