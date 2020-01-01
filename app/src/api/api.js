import Server from './server';

class API extends Server {
    async getAreas(version = '2020') {
        try {
            const result = await this.axios('get', `/json/${version}/areas.json`);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getScenics(version = '2020') {
        try {
            const result = await this.axios('get', `/json/${version}/scenics.json`);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new API();