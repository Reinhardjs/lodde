<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h2 align="center">Lodde</h2>
  
  <!-- PROJECT SHIELDS -->
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]
  
  <p align="center">
    Simple API Wrapper Library for cool JS API client cli-app
    <br />
    <a href="https://github.com/reinhardjs/lodde"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/reinhardjs/lodde">View Demo</a>
    ·
    <a href="https://github.com/reinhardjs/lodde">Report Bug</a>
    ·
    <a href="https://github.com/reinhardjs/lodde">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



## The philosophy
Lodde name originated from Capelin, kind of a fish from North Atlantic, North Pacific and Arctic oceans.
Secondly, also because it's main purpose is to wrap the loads of API's http requests.
So, lodde fish and lodde load. That's all.



#### Built With

* [![Node.js][Node.js]][Node.js-url]



<!-- GETTING STARTED -->
### Installation

Run these following commands

1. Add lodde to your node package's dependency
   ```sh
   npm install lodde
   ```

2. Continue reading the `Usage` section below on how to use the functions provided by lodde.


<!-- USAGE EXAMPLES -->
## Usage
To be able to call lodde's functions, first, instantiate the loddeClient
```js
const loddeClient = lodde.init();
```

and then, to call functions, for example, you can run the following

example command:
```js
loddeClient.getAll()
```

becase the returned value of functions is javascript `Promise`, then you can handle it by following

```js
loddeClient
    .getAll()
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.log(error);
    });
```

#### Functions available

<table>
<tr>
  <th>No</th>
  <th>Function</th>
  <th>Description</th>
  <th>Arguments Description</th>
</tr>
<tr>
  <td>1</td>
  <td>getAll()</td>
  <td>To get all records</td>
  <td>-</td>
</tr>
<tr>
  <td>2</td>
  <td>getAllBy(key, value)</td>
  <td>To get all records by column and value</td>
  <td>
    key: column name | value : value by column
  </td>
</tr>
<tr>
  <td>2</td>
  <td>getAllByRange(by, from, to)</td>
  <td>To get all records by column in range</td>
  <td>
    by: column name | from: from value | to: to value 
  </td>
</tr>
<tr>
  <td>3</td>
  <td>getMaxPrice()</td>
  <td>To get record with highest price</td>
  <td>
    -
  </td>
</tr>
<tr>
  <td>4</td>
  <td>getMostRecord(by, value)</td>
  <td>To get record with highest size by column value</td>
  <td>
    by: column name | value: column value
  </td>
</tr>
<tr>
  <td>5</td>
  <td>getById(id)</td>
  <td>To get record with given id</td>
  <td>
    id: string id
  </td>
</tr>
<tr>
  <td>6</td>
  <td>addRecord(data)</td>
  <td>To add new record</td>
  <td>
    data example { komoditas: "LELE", size: 77, ... }
  </td>
</tr>
<tr>
  <td>7</td>
  <td>updateRecord(condition, set)</td>
  <td>To add new record</td>
  <td>
    condition example { uuid: "<id>", ... } </br>
    set example { komoditas: "LELE", size: 77, ... }
  </td>
</tr>
<tr>
  <td>8</td>
  <td>deleteRecord(condition)</td>
  <td>To add new record</td>
  <td>
    condition example { uuid: "<id>", ... } </br>
  </td>
</tr>
</table>

_For more examples, please refer to the [Documentation](https://example.com)_




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Reinhard Jonathan Silalahi - [@reinhard_js](https://twitter.com/reinhard_js) - reinhardjsilalahi@gmail.com

Project Link: [https://github.com/reinhardjs/lodde](https://github.com/reinhardjs/lodde)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/reinhardjs/lodde.svg?style=for-the-badge
[contributors-url]: https://github.com/reinhardjs/lodde/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/reinhardjs/lodde.svg?style=for-the-badge
[forks-url]: https://github.com/reinhardjs/lodde/network/members
[stars-shield]: https://img.shields.io/github/stars/reinhardjs/lodde.svg?style=for-the-badge
[stars-url]: https://github.com/reinhardjs/lodde/stargazers
[issues-shield]: https://img.shields.io/github/issues/reinhardjs/lodde.svg?style=for-the-badge
[issues-url]: https://github.com/reinhardjs/lodde/issues
[license-shield]: https://img.shields.io/github/license/reinhardjs/lodde.svg?style=for-the-badge
[license-url]: https://github.com/reinhardjs/lodde/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/reinhardjsilalahi
[product-screenshot]: images/screenshot.png
[Node.js]: https://img.shields.io/npm/v/npm.svg?logo=nodedotjs
[Node.js-url]: https://nodejs.org/
