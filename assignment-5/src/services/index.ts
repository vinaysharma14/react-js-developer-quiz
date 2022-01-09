export const call = async (
  method: 'GET' | 'POST',
  endpoint: string,
  body?: BodyInit,
): Promise<Response['json']> => {
  const baseUrl = process.env.REACT_APP_DATA_MUSE_API_BASEURL;

  try {
    const [response] = await Promise.all([
      fetch(`${baseUrl}/${endpoint}`, {
        body,
        method,
        headers: { ...body ? { 'Content-Type': 'application/json' } : {} },
      }),

      // prevent loader flash by displaying it for at least 500ms
      new Promise((resolve) => setTimeout(resolve, 500)),
    ]);

    if (response.status > 200) {
      throw new Error(`${response.status}`);
    }

    return await response.json();
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
