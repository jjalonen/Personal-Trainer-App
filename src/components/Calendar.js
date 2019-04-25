import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";



const localizer = BigCalendar.momentLocalizer(moment);
class Calendar extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
       

        var dateArray = [];
        for (var i = 0; i < responseData.length; i++) {
          dateArray.push({
            start: new Date(responseData[i].date),
            end: new Date(responseData[i].date + responseData[i].duration * 60000),
            title: responseData[i].activity,

          });
        }
        this.setState({ events: dateArray });
      })
  }
  render() {

    return (
      <div>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          views={{
            month: true,
            week: true,
            agenda: true,

          }}
          drilldownView="agenda"
          step={20}
          showMultiDayTimes
          defaultDate={new Date()}
          style={{ height: "450px", margin: "60px 40px" }}
        />
        
      </div>
    )
  }
}

export default Calendar;