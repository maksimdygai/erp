import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import 'fullcalendar';
import fetchTasks from 'modules/notes/tasks/actions/fetch';
import dictionaries from 'generic/dictionaries';

class Calendar extends React.Component {
  constructor() {
      super();

      this.state = {events: []};
  }

  getCalendar(props) {
    $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
      events: props.events,
      eventClick: calEvent => browserHistory.push(calEvent.link),
      locale: 'ru',
      views: {
        week: {
          columnFormat: 'dd D/M'
        }
      },
      timeFormat: 'HH:mm',
      monthNames: ['Январь','Февраль','Март','Апрель','Май','οюнь','οюль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','οюнь','οюль','Авг.','Сент.','Окт.','Ноя.','Дек.'],
      dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
      dayNamesShort: ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],
      buttonText: {
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День"
      }
    })
  }

  setEvents(events) {
      this.setState({events: _.map(events, E => {
          return {
              id: `${E.type}_${E.id}`,
              allDay: false,
              start: E.type >= 301 && E.type <= 400 ?
                      moment(E.dead_line).format('YYYY-MM-DD HH:mm') :
                      moment(E.created_at).format('YYYY-MM-DD HH:mm'),
              end: E.type >= 301 && E.type <= 400 ?
                      moment(E.dead_line).format('YYYY-MM-DD HH:mm') :
                      moment(E.created_at).format('YYYY-MM-DD HH:mm'),
              title: _.find(dictionaries.note_types, T => T.id == E.type).value,
              className: "fc-content",
              link: E.deal ? `deals/${E.deal.id}` : `clients/${E.client.id}`,
              color: _.find(dictionaries.note_types, T => T.id == E.type).color
          };
      })});
  }

  componentWillMount() {
      this.props.fetchTasks();

      if (this.props.events) {
          this.setEvents(this.props.events);
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events && nextProps.params &&
        !_.isEqual(nextProps.events, this.props.events)) {
        const
            filteredEvents = _.filter(nextProps.events, E =>
                E.deal && _.find(nextProps.params.userDeals, D => D.id == E.deal.id) ||
                E.client && _.find(nextProps.params.userClients, C => C.id == E.client.id));

        this.setEvents(filteredEvents);
    }
  }

  componentDidMount() {
    this.getCalendar({events: this.state.events});
  }

  componentDidUpdate() {
    $('#calendar').fullCalendar('destroy');
    this.getCalendar({events: this.state.events});
  }

  render(){
    return (
      <div id="calendar"></div>
    )
  }
}

function mapStateToProps(state) {
    return {
        events: state.notes.tasks.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: bindActionCreators(fetchTasks, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
