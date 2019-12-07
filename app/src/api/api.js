import Server from './server';

class API extends Server {
    async getAreas() {
        try {
            const result = await this.axios('get', `/json/areas.json`);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getScenics() {
        try {
            const result = await this.axios('get', `/json/scenics-2019.json`);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default new API();