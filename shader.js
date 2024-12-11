import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

let renderer, scene, camera, material, uniforms;

function init() {
  const canvas = document.getElementById('shaderCanvas');
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.position.z = 1;

  const textureLoader = new THREE.TextureLoader();
  const pageTexture1 = textureLoader.load('./page1.jpg');
  const pageTexture2 = textureLoader.load('./page2.jpg');
  const backgroundTexture = textureLoader.load('./background.jpg');

  uniforms = {
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iTime: { value: 0 },
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
    iChannel0: { value: backgroundTexture },
    iChannel1: { value: pageTexture1 },
    iChannel2: { value: pageTexture2 },
  };

  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: `
    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec4 iMouse;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;

    #define PI 3.14159265
    #define BOOK_BOUNDS vec4(0.15, 0.05, 0.85, 0.95)

    #define LIGHT_DIR vec3(5,3,1)
    #define SPECULAR_SHININESS 16.0
    #define SPECULAR_COLOR vec3(1.0,1.0,1.0)
    #define SPECULAR_POWER 10.0

    vec3 fakeSpine(vec3 col, float t, float darken)
    {
        return mix(col * darken,col , min(1.0,pow(abs(t - 0.5) * 30.0, 0.5)));
    }

    vec3 fakeNormal(float t, float center)
    {
        t -= center;
        float interp =(1.0 - abs((t - 0.5) * 2.0)) * PI + PI * (3.0/4.0) ;
            
        vec3 normal = vec3(abs(sin(interp)) ,0,abs(cos(interp)));

        return mix(normal, vec3(0,0,1), min(1.0,pow(abs(t - 0.5) * 5.0, 0.5)));
    }

    vec3 specular(vec3 viewDir, vec3 normal )
    {
        vec3 lightDir = normalize(LIGHT_DIR);
        float dist = length(lightDir);
        vec3 halfV = normalize(lightDir + normalize(viewDir));

        float NdotH = dot(normal, halfV);
        float intensity = pow(max(NdotH, 0.0), SPECULAR_SHININESS);

        return intensity * SPECULAR_COLOR * SPECULAR_POWER / dist; 
    }

    bool pageFlip(vec2 uv, vec2 mouse, vec2 topRight, inout vec2 sampleUV, inout vec3 normal, out float toHalfEdge)
    {
        vec2 toEdge = topRight - mouse;
        vec2 toEdgeN = normalize(toEdge);
        
        vec2 toPixel = uv - mouse;
        
        vec2 diagonal = normalize(vec2(1.0));
        float cosT = dot(toEdgeN, diagonal);
        float cosT2 = 2.0 * cosT * cosT - 1.0;
        vec2 toEdgePerp = vec2(toEdgeN.y, -toEdgeN.x);
        
        float dir = sign(dot(toEdgePerp,diagonal));
        float sinT2 = dir * sqrt(1.0 - cosT2 * cosT2);
        
        vec2 nextPageUp = vec2(-sinT2, cosT2);
        vec2 nextPageRight = vec2(nextPageUp.y, -nextPageUp.x);
        
        if(dot(toPixel, nextPageUp) >= 0.0 && dot(toPixel, nextPageRight) >= 0.0)
        {
            vec2 halfPoint = mouse + toEdge * 0.5;
            vec2 toPixHP = uv - halfPoint;
            
            float proj = dot(toEdgePerp, (uv - halfPoint));
            vec2 projPoint = halfPoint + toEdgePerp * proj;
                
            float distDiff = distance(projPoint, uv) / distance(mouse, halfPoint);
            toHalfEdge = distDiff;
            
            if(dot(toPixHP, toEdge) < 0.0)
            {
                sampleUV = (sampleUV - mouse);
                sampleUV = vec2(sampleUV.y, -sampleUV.x);
                mat2 rot = mat2(cosT2, -sinT2, sinT2, cosT2); 
                sampleUV = rot * sampleUV;
                sampleUV.y *= -1.0;
                sampleUV.y = 1.0 - sampleUV.y;
                

                distDiff *= 0.5;
                normal = fakeNormal(distDiff, -0.43);
            }
            else
            {
                
                normal = fakeNormal(uv.x / topRight.x, 0.07);
            }

            return false;
        }
        
        return true;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {

        vec2 uv = fragCoord/iResolution.xy;

        vec3 bgCol = texture(iChannel0, uv).xyz;

        vec3 outCol = bgCol;
        
        vec2 bookUV = uv - BOOK_BOUNDS.xy;
        vec2 bookSize = vec2(BOOK_BOUNDS.zw - BOOK_BOUNDS.xy);
        bookUV /= bookSize;

        vec2 topRight = vec2(bookSize.y / bookSize.x, 1); 
        vec2 sUV = bookUV;
        sUV.x *= topRight.x;

        vec2 nMouse = iMouse.xy / iResolution.xy;
        nMouse -= BOOK_BOUNDS.xy;
        nMouse /= bookSize.xy;
        nMouse = clamp(nMouse, vec2(0.0),vec2(1.0));
        
        
        if(iMouse.z <= 0.0 && iTime > 0.0)
        {
            nMouse = vec2((sin(iTime + 0.3) + 1.0) * 0.5,(cos(iTime * 0.5) + 1.0) * 0.5);
        }
        nMouse.x *= topRight.x;


        float radius = topRight.x * 0.5;
        vec2 spineTop = vec2(radius, 1.0);
        vec2 spineMouse = nMouse - spineTop;
        float len = length(spineMouse);
        nMouse = spineTop + normalize(spineMouse) * min(len, radius);

        vec2 sampleUV = sUV;

        vec3 normal = vec3(0,0,1);
        float halfEdgeDist = 1.0;
        bool firstPage = pageFlip(sUV, nMouse, topRight, sampleUV, normal, halfEdgeDist);

        sampleUV.x /= topRight.x;

        vec3 page1 = texture(iChannel2, sampleUV).xyz;
        vec3 page2 = texture(iChannel1, sampleUV).xyz;
        page1 = fakeSpine(page1,bookUV.x, 0.2);
        page2 = fakeSpine(page2,sampleUV.x, 0.2);
        page2 = fakeSpine(page2,  (1.0 -halfEdgeDist) * 0.5, 0.4);

        vec3 pageCol = firstPage ? page1 : page2;

        vec3 normal2 =  fakeNormal(bookUV.x > 0.5 ? bookUV.x : 1.0 - bookUV.x, 0.07);

        normal = firstPage ? normal2 : normal;

        normalize(normal);
        pageCol += min(vec3(1,1,1), specular(vec3(0,0,1), normal)) * 0.3;

        if(sampleUV.x >= 0.0 && sampleUV.x <= 1.0 && sampleUV.y >= 0.0 && sampleUV.y <= 1.0)
        {
            outCol = pageCol;
        }

        fragColor = vec4(outCol,1.0);
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.iTime.value += 0.05;
  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {

  uniforms.iMouse.value.x = event.clientX;
  uniforms.iMouse.value.y = window.innerHeight - event.clientY;
  
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove);

init();
