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
    switch (weather) {
      case "100":
        return "https://cdn.heweather.com/cond_icon/100.png";
      case "101":
        return "https://cdn.heweather.com/cond_icon/101.png";
      case "102":
        return "https://cdn.heweather.com/cond_icon/102.png";
      case "103":
        return "https://cdn.heweather.com/cond_icon/103.png";
      case "104":
        return "https://cdn.heweather.com/cond_icon/104.png";
      case "200":
        return "https://cdn.heweather.com/cond_icon/200.png";
      case "201":
        return "https://cdn.heweather.com/cond_icon/201.png";
      case "202":
        return "https://cdn.heweather.com/cond_icon/202.png";
      case "203":
        return "https://cdn.heweather.com/cond_icon/203.png";
      case "204":
        return "https://cdn.heweather.com/cond_icon/204.png";
      case "205":
        return "https://cdn.heweather.com/cond_icon/205.png";
      case "206":
        return "https://cdn.heweather.com/cond_icon/206.png";
      case "207":
        return "https://cdn.heweather.com/cond_icon/207.png";
      case "208":
        return "https://cdn.heweather.com/cond_icon/208.png";
      case "209":
        return "https://cdn.heweather.com/cond_icon/209.png";
      case "210":
        return "https://cdn.heweather.com/cond_icon/210.png";
      case "211":
        return "https://cdn.heweather.com/cond_icon/211.png";
      case "212":
        return "https://cdn.heweather.com/cond_icon/212.png";
      case "213":
        return "https://cdn.heweather.com/cond_icon/213.png";
      case "300":
        return "https://cdn.heweather.com/cond_icon/300.png";
      case "301":
        return "https://cdn.heweather.com/cond_icon/301.png";
      case "302":
        return "https://cdn.heweather.com/cond_icon/302.png";
      case "303":
        return "https://cdn.heweather.com/cond_icon/303.png";
      case "304":
        return "https://cdn.heweather.com/cond_icon/304.png";
      case "305":
        return "https://cdn.heweather.com/cond_icon/305.png";
      case "306":
        return "https://cdn.heweather.com/cond_icon/306.png";
      case "307":
        return "https://cdn.heweather.com/cond_icon/307.png";
      case "308":
        return "https://cdn.heweather.com/cond_icon/308.png";
      case "309":
        return "https://cdn.heweather.com/cond_icon/309.png";
      case "310":
        return "https://cdn.heweather.com/cond_icon/310.png";
      case "311":
        return "https://cdn.heweather.com/cond_icon/311.png";
      case "312":
        return "https://cdn.heweather.com/cond_icon/312.png";
      case "313":
        return "https://cdn.heweather.com/cond_icon/313.png";
      case "314":
        return "https://cdn.heweather.com/cond_icon/314.png";
      case "315":
        return "https://cdn.heweather.com/cond_icon/315.png";
      case "316":
        return "https://cdn.heweather.com/cond_icon/316.png";
      case "317":
        return "https://cdn.heweather.com/cond_icon/317.png";
      case "318":
        return "https://cdn.heweather.com/cond_icon/318.png";
      case "399":
        return "https://cdn.heweather.com/cond_icon/399.png";
      case "400":
        return "https://cdn.heweather.com/cond_icon/400.png";
      case "401":
        return "https://cdn.heweather.com/cond_icon/401.png";
      case "402":
        return "https://cdn.heweather.com/cond_icon/402.png";
      case "403":
        return "https://cdn.heweather.com/cond_icon/403.png";
      case "404":
        return "https://cdn.heweather.com/cond_icon/404.png";
      case "405":
        return "https://cdn.heweather.com/cond_icon/405.png";
      case "406":
        return "https://cdn.heweather.com/cond_icon/406.png";
      case "407":
        return "https://cdn.heweather.com/cond_icon/407.png";
      case "408":
        return "https://cdn.heweather.com/cond_icon/408.png";
      case "409":
        return "https://cdn.heweather.com/cond_icon/409.png";
      case "410":
        return "https://cdn.heweather.com/cond_icon/410.png";
      case "499":
        return "https://cdn.heweather.com/cond_icon/499.png";
      case "500":
        return "https://cdn.heweather.com/cond_icon/500.png";
      case "501":
        return "https://cdn.heweather.com/cond_icon/501.png";
      case "502":
        return "https://cdn.heweather.com/cond_icon/502.png";
      case "503":
        return "https://cdn.heweather.com/cond_icon/503.png";
      case "504":
        return "https://cdn.heweather.com/cond_icon/504.png";
      case "507":
        return "https://cdn.heweather.com/cond_icon/507.png";
      case "508":
        return "https://cdn.heweather.com/cond_icon/508.png";
      case "509":
        return "https://cdn.heweather.com/cond_icon/509.png";
      case "510":
        return "https://cdn.heweather.com/cond_icon/510.png";
      case "511":
        return "https://cdn.heweather.com/cond_icon/511.png";
      case "512":
        return "https://cdn.heweather.com/cond_icon/512.png";
      case "513":
        return "https://cdn.heweather.com/cond_icon/513.png";
      case "514":
        return "https://cdn.heweather.com/cond_icon/514.png";
      case "515":
        return "https://cdn.heweather.com/cond_icon/515.png";
      case "900":
        return "https://cdn.heweather.com/cond_icon/900.png";
      case "901":
        return "https://cdn.heweather.com/cond_icon/901.png";
      case "999":
        return "https://cdn.heweather.com/cond_icon/999.png";
      default:
        return "";
    }
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
