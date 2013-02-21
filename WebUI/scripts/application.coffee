@wireUpEvents = (function1, function2) ->
    $(document).ready ->
      $('#btn-run').on 'click', ->
        function1()
      if function2?
        $('#btn-run2').on 'click', ->
          function2()