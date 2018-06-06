import React, { Component } from "react";
import { webServiceKey } from "../data";
import logo from "../food.svg";

class Header extends Component {
  state = {
    weather: null
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
      });
  }

  componentWillReceiveProps({ cityCode }) {
    if (!this.state.weather && cityCode) {
      // 避免重复抓取天气
      this.getWeatherInfo(cityCode);
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
              {this.getWeatherIcon(weather.weather) ? (
                <i
                  className={`iconfont ${this.getWeatherIcon(weather.weather)}`}
                />
              ) : (
                <p>{weather.weather}</p>
              )}
              <p>{weather.temperature}℃</p>
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
