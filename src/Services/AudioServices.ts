import AudioRecorderPlayer, {
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

class AudioServices {
  private audioRecorderPlayer = new AudioRecorderPlayer();
  private recordingDuration = '';
  private recordingTime = 0;

  async StartRecording() {
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const result = await this.audioRecorderPlayer.startRecorder(
      undefined,
      audioSet,
    );

    this.audioRecorderPlayer.addRecordBackListener(data => {
      this.recordingTime = data.currentPosition;
      this.recordingDuration = this.audioRecorderPlayer.mmssss(
        Math.floor(data.currentPosition),
      );
    });

    return result;
  }

  async StopRecording() {
    this.audioRecorderPlayer.removeRecordBackListener();
    return await this.audioRecorderPlayer.stopRecorder();
  }

  async PlayAudio(uri: string, headers?: any) {
    return await this.audioRecorderPlayer.startPlayer(uri, headers);
  }

  async PauseAudio() {
    return await this.audioRecorderPlayer.pausePlayer();
  }

  async StopAudio() {
    return await this.audioRecorderPlayer.stopPlayer();
  }

  async SeekTo(duration: number) {
    return this.audioRecorderPlayer.seekToPlayer(duration);
  }

  async handlePlayBack(callback: (props: any) => any) {
    this.audioRecorderPlayer.addPlayBackListener(callback);
  }

  getInstance() {
    return this.audioRecorderPlayer;
  }

  getDuration() {
    return {
      timeInString: this.recordingDuration,
      recordingTime: this.recordingTime,
    };
  }
}

export default new AudioServices();
