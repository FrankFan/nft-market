import axiosHttp from './axios';

interface requestOptionType {
  /**
   * 完整的接口url，包含 baseUrl + path
   */
  url: string;
  method: 'post' | 'get';
  body?: Record<string, any>;
  timeout?: number;
  headers?: Record<string, any>;
  contentType?: string;
  responseType?: string;
  debug?: boolean;
}

export default {
  async request(options: requestOptionType) {
    const { ...requestOpts } = options;
    let axiosOptions = {};
    if (options.method.toLowerCase() === 'get') {
      axiosOptions = {
        ...requestOpts,
        params: options.body,
      };
    } else if (options.method.toLowerCase() === 'post') {
      axiosOptions = {
        ...requestOpts,
        data: options.body,
      };
    }
    const response = await axiosHttp.request(axiosOptions);
    return {
      requestImpl: 'axios',
      ...response,
    };
  },
};
