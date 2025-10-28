async function getItems(url) {
  const headers = {
    'X-Access-Key': '$2b$10$wh.K0go7oYuH93pP1amFBupx4yjy0VcOnlcWDM.Oh9CT4o1QxvuFq',
    'X-Bin-Meta': 'false',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    alert('There was an issue with fetching data. Please try again later.');
    return null;
  }
}

export default getItems;
