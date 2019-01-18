const __request = require("request");

class RequestHTML {
  constructor() {
    this.headers = {
      "User-Agent":
        "Captain-Curious (https://github.com/AlexParra03/spiderbot)",
      Accept: "text/html"
    };
  }

  /**
   * Creates a promise
   * @param {Object} options used as a parameter in the 'request' library
   */
  __fetchPage(options) {
    return new Promise(function(resolve, reject) {
      __request(options, function(err, response) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Promise that returns the HTML content of a page.
   * Ex: instance.get("https://example.com").then( function (html) ... )
   * @param {String} url of the page to fetch
   */
  get(url) {
    const options = { url: url, headers: this.headers };
    return this.__fetchPage(options).then(
      function(response) {
        return response.body;
      },
      function(err) {
        console.log(err);
      }
    );
  }

  /**
  * Getting all the absolute and relative links from HTML
  * @param {String} html page to be crawled
  * @return {Array} URLs grabbed from the html
  */
  getPaths(html) {
    const urls = [];
    const $ = cheerio.load(html);
    const links = $('a');
    $(links).each(function(i, link){
      urls.push($(link).attr('href'));
    });
    return urls;
  }
}
