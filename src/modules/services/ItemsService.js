async function getItems(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Access-Key': '$2b$10$wh.K0go7oYuH93pP1amFBupx4yjy0VcOnlcWDM.Oh9CT4o1QxvuFq',
        'X-Bin-Meta': false,
      },
    });
    return await res.json();
  } catch (error) {
    alert('There was an issue with fetching data');
    return error;
  }
}

export default getItems;
