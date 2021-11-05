import React , {useState} from 'react';
import { View , StyleSheet ,Text , TouchableOpacity , TextInput ,SafeAreaView , Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import  {  useNavigation } from '@react-navigation/native';
export default function SignIn() {
  const navigation = useNavigation();
  const [name , setName] = useState('');
  const [email, setEmail] = useState('');    
  const [password , setPassword] = useState('');
  const [type, setType] = useState(false);

  function handleLogin(){
      if(type){
          //Cadastrar um usuario
          if(name === '' || email === '' || password === '') return;
          auth().createUserWithEmailAndPassword(email, password)
          .then((snapshot)=>{
              snapshot.user.updateProfile({
                displayName: name
              })
              .then(()=>{
                navigation.goBack();
              })
          })
          .catch((error)=>{
            if (error.code === 'auth/email-already-in-use') {
              console.log('Esse e-mail já esta em uso!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('Esse e-mail é invalido!');
            }
          })

      }else{
        //Logar um usuario
        auth().signInWithEmailAndPassword(email , password)
        .then(()=>{
           navigation.goBack(); 
        })
        .catch((error)=>{
          if (error.code === 'auth/invalid-email') {
            console.log('Esse e-mail é invalido!');
          }
        })
      }
  }

  return (
   <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Nossos Grupos</Text>
      <Text style={{marginBottom:20}}>Olá , vamos de network</Text>
    

      { type && (
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text)=>setName(text)}
        placeholder="Digite seu nome"
        placeholderTextColor="#99999b"
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text)=>setEmail(text)}
        placeholder="Digite seu email"
        placeholderTextColor="#99999b"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text)=>setPassword(text)}
        placeholder="Digite uma senha"
        placeholderTextColor="#99999b"
        secureTextEntry={true}
      />

      <TouchableOpacity style={[styles.buttonLogin , { backgroundColor: type ? "#57dd86" : "#000066"  }   ]}
          onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {type ? "Cadastrar" : "Acessar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setType(!type)} >
        <Text>
          {type ? "Já possuo uma conta" : "Criar uma nova conta"}
        </Text>
      </TouchableOpacity>

   </SafeAreaView>
 );
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#fff'
    },
    logo:{
      marginTop: Platform.OS === 'android' ? 55 : 80,
      fontSize:28,
      fontWeight: 'bold'
    },
    input:{
      color:'#121212',
      backgroundColor: '#ebebeb',
      width: '90%',
      borderRadius: 6,
      marginBottom:10,
      paddingHorizontal: 8,
      height:50,
    },
    buttonLogin:{
      width:'90%',
      height: 50,
      justifyContent: 'center',
      alignItems:'center',
      borderRadius:6,
      marginBottom: 10,
    },
    buttonText:{
      color:'#fff',
      fontWeight:'bold',
      fontSize: 20
    }
})
