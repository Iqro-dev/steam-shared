type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: HeadersInit;
};

export const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { method = "GET", body, headers = {} } = options;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const response = await fetch(endpoint, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
