export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        const API_KEY = '479311df279p7jvv1kqtm0';
        const DOODSTREAM_API = 'https://doodapi.com/api';
        
        const url = new URL(request.url);
        const action = url.searchParams.get('action') || 'list';
        
        try {
            let apiUrl = `${DOODSTREAM_API}/file/list?key=${API_KEY}&page=1&per_page=100`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            return new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    }
};
