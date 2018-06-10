import React, { Component } from "react";
import { webServiceKey } from "../data";
import logo from "../food.svg";

class Header extends Component {
  state = {
    weather: null,
    isWeatherLoading: false
  };

  /**
   * 根据天气获取图标
   *
   * @param {string} weather
   * @returns
   * @memberof Header
   */
  getWeatherIcon(weather) {
    switch (weather) {
      case "晴":
        return "icon-qing1";
      case "多云":
        return "icon-duoyun";
      case "阴":
        return "icon-yin";
      case "阵雨":
        return "icon-zhenyu";
      case "雷阵雨":
        return "icon-leizhenyu1";
      case "雷阵雨并伴有冰雹":
        return "icon-leizhenyubanbingbao1";
      case "小雨":
        return "icon-xiaoyu";
      case "中雨":
        return "icon-zhongyu";
      case "大雨":
        return "icon-dayu1";
      case "暴雨":
        return "icon-baoyu1";
      case "大暴雨":
        return "icon-dabaoyu1";
      case "特大暴雨":
        return "icon-tedabaoyu";
      case "阵雪":
        return "icon-zhenxue";
      case "小雪":
        return "icon-xiaoxue";
      case "中雪":
        return "icon-zhongxue";
      case "大雪":
        return "icon-daxue1";
      case "暴雪":
        return "icon-baoxue1";
      case "雾":
        return "icon-wu";
      case "冻雨":
        return "icon-dongyu";
      case "沙尘暴":
        return "icon-shachenbao1";
      case "浮尘":
        return "icon-fuchen1";
      case "扬沙":
        return "icon-yangsha";
      case "强沙尘暴":
        return "icon-qiangshachenbao1";
      case "飑":
        return "icon-biao";
      case "龙卷风":
        return "icon-tianqizitiku18";
      case "轻雾":
        return "icon-wu";
      case "霾":
        return "icon-mai1";
      default:
        return "";
    }
  }

  /**
   * 抓取天气信息
   *
   * @param {string} adcode
   * @memberof Header
   */
  getWeatherInfo(adcode) {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${webServiceKey}&city=${adcode}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.info === "OK" && data.infocode === "10000") {
          this.setState({
            weather: data.lives[0]
          });
        }
      })
      .catch(err => {
        // 天气获取失败，什么也不显示，该项功能不生效不影响全局功能
        console.log("天气获取失败");
      });
  }


  /**
   * 根据天气代码获取图标链接
   *
   * @param {string} weather
   * @returns
   * @memberof Header
   */
  getWeatherIconHe(weather) {
    return weather? `https://cdn.heweather.com/cond_icon/${weather}.png`:'';
  }

  /**
   * 从和风天气API抓取天气信息
   *
   * @param {array} location
   * @memberof Header
   */
  getWeatherInfoHe(location) {
    const heKey = "1ee6a6036f3743f7a6492ce345b325b8";
    const url = `https://free-api.heweather.com/s6/weather/now?location=${location}&key=${heKey}`;
    this.setState({
      isWeatherLoading: true
    })
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.HeWeather6[0].status === "ok") {
          this.setState({ weather: data.HeWeather6[0].now });
        }else{
          console.error("天气信息获取失败", data);
        }
      })
      .catch(err => {
        // 天气获取失败，什么也不显示，该项功能不生效不影响全局功能
        console.error("天气信息获取失败",err);
      });
  }



  componentWillReceiveProps({ location }) {
    if (!this.state.isWeatherLoading && location.length !== 0) {
      // 避免重复抓取天气
      this.getWeatherInfoHe(location);
    }
  }

  render() {
    let { weather } = this.state;

    return (
      <div>
        <header className="header">
          <div className="header-left">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="title">吃货地图</h1>
          </div>
          {weather ? (
            <div className="weather">
              {this.getWeatherIcon(weather.cond_txt) ? (
                <img
                  src={this.getWeatherIconHe(weather.cond_code)}
                  alt="天气预报"
                />
              ) : (
                <p>{weather.cond_txt}</p>
              )}
              {weather.fl ? <p>{weather.fl}℃</p> : ""}
            </div>
          ) : (
            ""
          )}
        </header>
      </div>
    );
  }
}

Header.defaultProps = {
  cityCode: ""
};

export default Header;
