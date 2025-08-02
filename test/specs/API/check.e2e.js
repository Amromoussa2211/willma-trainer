const fetch = require('node-fetch');

async function deleteUser(userId, authToken) {
  const endpoint = 'https://staging.willma.life/api/graphql'; // Replace with actual endpoint

  const query = `
    mutation {
      removeUser(id: "${userId}") {
        id
        name
        email
        role
        phoneNumber
        isActive
        isVerified
        createdAt
        updatedAt
        deletedAt
      }
    }
  `; 

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // Include token if needed
    },
    body: JSON.stringify({ query })
  });

  const result = await response.json();

  if (result.errors) {
    console.error('Failed to delete user:', result.errors);
    throw new Error('GraphQL deletion failed');
  }

  return result.data.removeUser;
}

module.exports = { deleteUser };