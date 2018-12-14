$(document).ready(function() {
  var $loading = $('.loading-block'),
      $prescription = $('[id*=prescription-results]'),
      $medical = $('[id*=medical-results]'),
      $error = $('[id*=error-results]');

  $('.date-range').change(function(event) {
    var $val = 'Last ' + $(this).val(),
        $visible,
        $title;

    if ($('.tab-pane').length > 0) {
      $title = $(this).closest('.tab-pane').find('.days-title');
      $visible = $(this).closest('.tab-pane').find('.search-container[aria-hidden=false]').attr('id');
    } else {
      $title = $('.days-title');
      $visible = $('.search-container[aria-hidden=false]').attr('id');
    }

    if ($(this).val() !== 'custom-search') {
      $title.html($val);

      if ($visible === 'error-results') {
        var $EOBtype = $('.eob-type').val();

        if ($EOBtype === 'Prescription Drug') {
          changeSearch($visible, $prescription);
        } else if ($EOBtype === 'Medical') {
          changeSearch($visible, $medical);
        } else {
          changeSearch($visible, $error.prev());
        }
      } else {
        showLoading();
      }
    }
  });

  $('.eob-type').change(function(event) {
    var $val = $(this).val(),
        $EOBtype = $('.eob-type').val() + ' EOBs',
        $visible = $('.search-container[aria-hidden=false]').attr('id');

    if ($visible !== 'error-results') {
      if ($val === 'Prescription Drug') {
        changeSearch($visible, $prescription);
        $('.eob-title').html($EOBtype);
      } else if ($val === 'Medical') {
        changeSearch($visible, $medical);
        $('.eob-title').html($EOBtype);
      }
    } else {
      $('.eob-title').html($EOBtype);
      showLoading();
    }
  });

  $('.custom-date-search-btn').click(function(event) {
    event.preventDefault();

    var $from = $(this).closest('form').find('[id*=custom-from]'),
        $to = $(this).closest('form').find('[id*=custom-to]'),
        $visible = $('.search-container[aria-hidden=false]').attr('id'),
        $EOBtype;

    if ($('.eob-type').val() !== undefined) {
      $EOBtype = $('.eob-type').val() + ' EOBs';
    } else {
      $EOBtype = $('#' + $visible).find('.eob-title').html();
    }

    if ($from.val().length > 1 && $to.val().length > 1) {
      changeSearch($visible, $error);

      $('.eob-title').html($EOBtype);
    }
  });

  function changeSearch($hide, $show) {
    $('#' + $hide).addClass('hidden');
    $('#' + $hide).attr('aria-hidden', 'true');
    $show.removeClass('hidden');
    $show.attr('aria-hidden', 'false');

    showLoading();
  }

  function showLoading() {
    $loading.show();

    setTimeout(function () {
      $loading.hide();
    }, 300);
  }

  $('.cal-test').focus(function(event) {
    var parent = $(this).parent(),
        html = `
        <ul role="presentation" class="uib-datepicker-popup">
          <li>
            <div class="uib-datepicker" role="application">
              <div>
                <div class="uib-daypicker">
                  <table role="grid" aria-labelledby="datepicker-12888-8041-title" aria-activedescendant="datepicker-12888-8041-2">
                    <thead>
                      <tr>
                        <th><button type="button" class="uib-left" tabindex="-1">&lt;<span class="sr-only">previous</span></button></th>
                        <th colspan="6"><button id="datepicker-12888-8041-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="uib-title" tabindex="-1"><strong>March 2017</strong></button></th>
                        <th><button type="button" class="uib-right" tabindex="-1">&gt;<span class="sr-only">next</span></button></th>
                      </tr>
                      <tr>

                        <th class="text-center"></th>


                        <th class="text-center"><small aria-label="Monday">Mo</small></th>

                        <th class="text-center"><small aria-label="Tuesday">Tu</small></th>

                        <th class="text-center"><small aria-label="Wednesday">We</small></th>

                        <th class="text-center"><small aria-label="Thursday">Th</small></th>

                        <th class="text-center"><small aria-label="Friday">Fr</small></th>

                        <th class="text-center"><small aria-label="Saturday">Sa</small></th>

                        <th class="text-center"><small aria-label="Sunday">Su</small></th>

                      </tr>
                    </thead>
                    <tbody>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>9</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-0">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">27</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-1">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">28</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-2">
                          <button type="button" class="btn-day active" tabindex="-1"><span>1</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-3">
                          <button type="button" class="btn-day" tabindex="-1"><span>2</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-4">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-info">3</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-5">
                          <button type="button" class="btn-day" tabindex="-1"><span>4</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-6">
                          <button type="button" class="btn-day" tabindex="-1"><span>5</span></button>
                        </td>

                      </tr>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>10</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-7">
                          <button type="button" class="btn-day" tabindex="-1"><span>6</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-8">
                          <button type="button" class="btn-day" tabindex="-1"><span>7</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-9">
                          <button type="button" class="btn-day" tabindex="-1"><span>8</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-10">
                          <button type="button" class="btn-day" tabindex="-1"><span>9</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-11">
                          <button type="button" class="btn-day" tabindex="-1"><span>10</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-12">
                          <button type="button" class="btn-day" tabindex="-1"><span>11</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-13">
                          <button type="button" class="btn-day" tabindex="-1"><span>12</span></button>
                        </td>

                      </tr>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>11</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-14">
                          <button type="button" class="btn-day" tabindex="-1"><span>13</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-15">
                          <button type="button" class="btn-day" tabindex="-1"><span>14</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-16">
                          <button type="button" class="btn-day" tabindex="-1"><span>15</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-17">
                          <button type="button" class="btn-day" tabindex="-1"><span>16</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-18">
                          <button type="button" class="btn-day" tabindex="-1"><span>17</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-19">
                          <button type="button" class="btn-day" tabindex="-1"><span>18</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-20">
                          <button type="button" class="btn-day" tabindex="-1"><span>19</span></button>
                        </td>

                      </tr>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>12</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-21">
                          <button type="button" class="btn-day" tabindex="-1"><span>20</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-22">
                          <button type="button" class="btn-day" tabindex="-1"><span>21</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-23">
                          <button type="button" class="btn-day" tabindex="-1"><span>22</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-24">
                          <button type="button" class="btn-day" tabindex="-1"><span>23</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-25">
                          <button type="button" class="btn-day" tabindex="-1"><span>24</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-26">
                          <button type="button" class="btn-day" tabindex="-1"><span>25</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-27">
                          <button type="button" class="btn-day" tabindex="-1"><span>26</span></button>
                        </td>

                      </tr>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>13</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-28">
                          <button type="button" class="btn-day" tabindex="-1"><span>27</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-29">
                          <button type="button" class="btn-day" tabindex="-1"><span>28</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-30">
                          <button type="button" class="btn-day" tabindex="-1"><span>29</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-31">
                          <button type="button" class="btn-day" tabindex="-1"><span>30</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-32">
                          <button type="button" class="btn-day" tabindex="-1"><span>31</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-33">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">1</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-34">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">2</span></button>
                        </td>

                      </tr>

                      <tr class="uib-weeks" role="row">

                        <td class="text-center h6"><em>14</em></td>


                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-35">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">3</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-36">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">4</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-37">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">5</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-38">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">6</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-39">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">7</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-40">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">8</span></button>
                        </td>

                        <td class="uib-day text-center" role="gridcell" id="datepicker-12888-8041-41">
                          <button type="button" class="btn-day" tabindex="-1"><span class="text-muted">9</span></button>
                        </td>

                      </tr>

                    </tbody>
                  </table>
                </div>



              </div>
            </div>
          </li>

          <li class="uib-button-bar clearfix">
            <span class="btn-group pull-left">
              <button type="button" class="btn uib-datepicker-current"><span class="btn btn--primary">Today</span></button>
              <button type="button" class="btn uib-clear"><span class="btn btn--secondary">Clear</span></button>
            </span>
            <button type="button" class="pull-right uib-close">Close</button>
          </li>

        </ul>
        `

      parent.append(html);
  });

  $('.cal-test').focusout(function(event) {
    var parent = $(this).parent();

    parent.find('.uib-datepicker-popup').remove();
  });
});
