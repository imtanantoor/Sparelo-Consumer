import AudioRecorderPlayer from 'react-native-audio-recorder-player';

class AudioServices {
  private audioRecorderPlayer = new AudioRecorderPlayer();
  private recordingDuration = '';
  private recordingTime = 0;

  async StartRecording() {
    const result = await this.audioRecorderPlayer.startRecorder();
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

  async PlayAudio(uri: string) {
    return await this.audioRecorderPlayer.startPlayer(uri);
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

  getDuration() {
    return {
      timeInString: this.recordingDuration,
      recordingTime: this.recordingTime,
    };
  }
}

export default new AudioServices();
