import 'dart:typed_data';

// import 'package:echoreader/audio_list.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:image/image.dart' as img;
import 'package:just_audio/just_audio.dart';
// import 'package:image_picker/image_picker.dart';


Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  List<CameraDescription> cameras = await availableCameras();
  runApp(MyApp(cameras: cameras));
}



class MyApp extends StatelessWidget {
  final List<CameraDescription> cameras;

  const MyApp({Key? key, required this.cameras});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: MyHomePage(title: 'Camera Preview', cameras: cameras),
    );
  }
}

// Feed your own stream of bytes into the player
class MyCustomSource extends StreamAudioSource {
  final List<int> bytes;
  MyCustomSource(this.bytes);

  @override
  Future<StreamAudioResponse> request([int? start, int? end]) async {
    start ??= 0;
    end ??= bytes.length;
    return StreamAudioResponse(
      sourceLength: bytes.length,
      contentLength: end - start,
      offset: start,
      stream: Stream.value(bytes.sublist(start, end)),
      contentType: 'audio/wav',
    );
  }
}

class MyHomePage extends StatefulWidget {
  final List<CameraDescription> cameras;
  final String title;

  const MyHomePage({Key? key, required this.title, required this.cameras});

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;
  final player = AudioPlayer();

  // List<File> saved_files = [];

  @override
  void initState() {
    super.initState();
    _controller = CameraController(widget.cameras[0], ResolutionPreset.high);
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<Uint8List?> testCompressFile(File file) async {
    var result = await FlutterImageCompress.compressWithFile(
      file.absolute.path,
      minWidth: 1920,
      minHeight: 1080,
      quality: 91
    );
    return result;
}

  Future<String> convertToBase64(XFile xFile) async {
  final bytes = await xFile.readAsBytes();
  final base64String = base64Encode(bytes);
  return base64String;
}

  void _showModal() {
    bool isSelected1 = false;
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Download & Play Audio'),
          content: Row(
            children: [
              IconButton(icon: isSelected1 ? Icon(Icons.pause) : Icon(Icons.play_arrow), onPressed: () {

              },),
              Text('This is a modal dialog'),
              IconButton(icon: isSelected1 ? Icon(Icons.download_done) : Icon(Icons.download), onPressed: () {
                setState(() {
                  isSelected1 = !isSelected1;
                });
              },),
            ],
          ),
          actions: [
            TextButton(
              child: Text('Close'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
}

  Future<Map<String, dynamic>> getData(String imgString) async {

  // URL to send the request to
  var url = Uri.parse('http://bd17-69-119-107-111.ngrok-free.app/get_img');

  // JSON data to send
  var payload = {
    "images": ["${imgString}"],
    "indices": [0]
  };

  // Create a new GET request
  var request = http.Request('GET', url);

  // Set the content type header to application/json
  request.headers['Content-Type'] = 'application/json';

  // Convert the JSON data to a string
  var jsonPayload = json.encode(payload);

  // Set the request body
  request.body = jsonPayload;

  // Send the request and wait for the response
  var response = await http.Client().send(request);

  // Check the response
  if (response.statusCode == 200) {
    // Request successful
    var responseBody = await response.stream.bytesToString();
    print('Request successful');
    print(responseBody);
    Map<String, dynamic> jsonMap = json.decode(responseBody);
    return jsonMap;
  } else {
    // Request failed
    print('Request failed with status code ${response.statusCode}');
    return {};
  }
}

  void _capturePhoto() async {
    if (!_controller.value.isInitialized) {
      return;
    }

    try {
      _showModal();
      XFile capturedImage = await _controller.takePicture();
      print(capturedImage.path);
      File image_data = File(capturedImage.path);
      Uint8List? shrunk_image = await testCompressFile(image_data);
      String image_base64 = await base64Encode(shrunk_image ?? []);
      

      Map<String,dynamic> serv_response = await getData(image_base64);
      List<int> audio_bytes = utf8.encode(serv_response['audio']);
      // print("arhanrhanrhanrnrhnannnahranrnahrhan");
      print(serv_response);
      // print("arhanrhanrhanrnrhnannnahranrnahrhan");

      _showModal();

      // File audio_file = File(r'echoreader\assets\output.wav');
      // audio_file.writeAsBytesSync(audio_bytes);


      // player.setAudioSource(MyCustomSource(audio_bytes));
      // player.play();

    } catch (e) {
      print('Error getting data: {$e}');
    }
  }

  Widget _buildCameraPreview() {
  return OrientationBuilder(
    builder: (context, orientation) {
      return Transform.scale(
        scaleX: 2.0,
        scaleY: 2.5,
        // scale: MediaQuery.of(context).devicePixelRatio ,
        alignment: Alignment.center, 
        child: Transform.rotate(
          angle: orientation == Orientation.portrait ? 90 * 3.1415926535 / 180 *-1: 0,
          child: CameraPreview(_controller),
        ),
      );
    },
  );
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("EchoReader"),
        centerTitle: true,
        // actions: [
        //   IconButton(
        //     icon: Icon(Icons.list),
        //     onPressed: (() => 
            
        //       Navigator.push(context, MaterialPageRoute(builder: (context) => AudioList()))
        //     ),
        //   ),
        // ],
      ),
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return _buildCameraPreview();
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: Container(
        alignment: Alignment.bottomCenter,
        child: FloatingActionButton(
          onPressed: _capturePhoto,
          tooltip: 'Capture Photo',
          child: const Icon(Icons.camera)
          ),
        ),
      );
  }
}