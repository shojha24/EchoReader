from TTS.api import TTS

# List available 🐸TTS models and choose the first one
model_name = TTS.list_models()[0]
# Init TTS
tts = TTS(model_name)
# Run TTS
# ❗ Since this model is multi-speaker and multi-lingual, we must set the target speaker and the language
# Text to speech with a numpy output
wav = tts.tts("This is a test! This is also a test!!", speaker=tts.speakers[1], language=tts.languages[0])
# Text to speech to a file
tts.tts_to_file(text="This is Papa", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_papa.wav")
tts.tts_to_file(text="This is Mummy", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_mummy.wav")
tts.tts_to_file(text="This is Raghav", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_raghav.wav")
tts.tts_to_file(text="This is Atharav", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_atharav.wav")
tts.tts_to_file(text="This is Zac Levy", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_zac.wav")
tts.tts_to_file(text="Face not recognized.", speaker=tts.speakers[1], language=tts.languages[0], file_path="alert_intruder.wav")



