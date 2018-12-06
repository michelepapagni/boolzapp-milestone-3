$(document).ready(function() {
	$('.new-message-inputs').keypress(function(e) {
		if (e.which == 13) {
			var thisInput = $(this);
			var newMessage = thisInput.val();
			var now = new Date();

			if (newMessage) {
				var messagesContainer = $('.right-messages-container .right-messages.active');

				//now i can append to the messages
				var messageTemplate = $('.template .message.sent').clone();
				messageTemplate.children('.message-text').text(newMessage);
				messageTemplate.children('.message-time').text(now.getHours() + ':' + now.getMinutes());

				messagesContainer.append(messageTemplate);

				var clearTemplate = $('.template .cl-t').clone();
				messagesContainer.append(clearTemplate);

				setTimeout(function() {
					var computerAnswerTemplate = $('.template .message.received').clone();
					computerAnswerTemplate.children('.message-text').text('Ok');
					computerAnswerTemplate.children('.message-time').text(now.getHours() + ':' + now.getMinutes());

					messagesContainer.append(computerAnswerTemplate);

					var newClearTemplate = $('.template .cl-t').clone();
					messagesContainer.append(newClearTemplate);
				}, 2000);

				thisInput.val('');
			}
		}
	});

	$('#contacts-filter').keyup(function() {
		var thisValue = $(this).val().toLowerCase();
		console.log(thisValue);

		$('.contact').each(function() {
			var contactName = $(this).find('.contact-name').text().toLowerCase();

			if (contactName.includes(thisValue)) {
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	});

	$('.contact').click(function() {
		//togliere a tutti i contatti la classe active
		$('.contact').removeClass('active');

		//aggiungere la classe active al contatto effettivamente cliccato
		$(this).addClass('active');

		//togliere la classe active anche a tutte le conversazioni
		$('.right-messages').removeClass('active');

		//prendo la posizione del contatto cliccato
		var numeroContatto = $(this).index();

		//uso la posizione del contatto cliccato per trovare la stessa posizione tra le conversazioni
		$('.right-messages').eq(numeroContatto).addClass('active');
	});

	//resto in ascolto di un click sull'icona del dropdown
	$(document).on('click', '.message.sent i', function() {
		$(this).siblings('.message-options-panel').toggleClass('active');
	});

	$(document).on('click', '.message-destroy', function() {
		var messageParent = $(this).parent().parent();

		messageParent.hide();
	});

});
