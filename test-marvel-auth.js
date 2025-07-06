// Simple standalone script to test Marvel API authentication
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' }); // Load environment variables from .env.local

// Your Marvel API keys from environment variables
const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

// Function to create MD5 hash
function md5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

// Make a test request to Marvel API
async function testMarvelAPI() {
  console.log('Marvel API Authentication Test');
  console.log('--------------------------');
  
  // Verify keys are available
  console.log('Public key available:', !!publicKey);
  console.log('Private key available:', !!privateKey);
  
  if (!publicKey || !privateKey) {
    console.error('❌ ERROR: API keys not found in .env.local file');
    return;
  }
  
  // Generate authentication parameters
  const timestamp = Date.now().toString();
  const stringToHash = timestamp + privateKey + publicKey;
  const hash = md5(stringToHash);
  
  console.log('Using timestamp:', timestamp);
  console.log('Using public key:', publicKey);
  console.log('Private key length:', privateKey.length, 'characters');
  
  // The endpoint we'll test with
  const endpoint = 'https://gateway.marvel.com/v1/public/characters';
  
  try {
    console.log('Making test request to:', endpoint);
    console.log('With params: ts, apikey, hash, limit=1');
    
    const response = await axios.get(endpoint, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
        limit: 1, // Just request 1 character to minimize data transfer
      }
    });
    
    // Successfully got data
    console.log('✅ SUCCESS! Authentication worked!');
    console.log('Response status:', response.status);
    console.log('Characters returned:', response.data.data.results.length);
    if (response.data.data.results.length > 0) {
      console.log('First character name:', response.data.data.results[0].name);
    }
    
  } catch (error) {
    console.error('❌ ERROR: Request failed');
    
    if (error.response) {
      console.error('Status code:', error.response.status);
      console.error('Error data:', JSON.stringify(error.response.data, null, 2));
      
      // Provide troubleshooting advice
      if (error.response.status === 401) {
        console.log('\n🔍 TROUBLESHOOTING:');
        console.log('1. Check that your public and private keys are correct');
        console.log('2. Verify that "localhost" and "127.0.0.1" are added to authorized referrers');
        console.log('3. Check that your keys have not been revoked or exceeded rate limits');
        console.log('4. If you\'re using this script directly (not through Next.js), this is a server-side request');
        console.log('   which should work even without referrer restrictions.');
      }
    } else {
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testMarvelAPI();
