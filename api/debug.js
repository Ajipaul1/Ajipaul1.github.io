export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const rawUrl = process.env.SUPABASE_URL || 'not set';
    
    // Test the sanitization function
    const sanitizeEnvVar = (val) => {
        if (!val || typeof val !== 'string') return val;
        let clean = val.trim();
        if (clean.includes('](')) {
            const parts = clean.split('](');
            if (parts[1]) {
                clean = parts[1].replace(/\)$/, '');
            }
        }
        clean = clean.replace(/^[\[\(\s]+/, '');
        clean = clean.replace(/[\]\)\s]+$/, '');
        const httpMatch = clean.match(/(https?:\/\/[^\s\)\(]+)/);
        if (httpMatch && httpMatch[1]) {
            clean = httpMatch[1];
        }
        return clean.replace(/\/+$/, '');
    };

    res.status(200).json({
        raw_env_supabase_url: rawUrl,
        sanitized_supabase_url: sanitizeEnvVar(rawUrl),
        timestamp: new Date().toISOString()
    });
}
