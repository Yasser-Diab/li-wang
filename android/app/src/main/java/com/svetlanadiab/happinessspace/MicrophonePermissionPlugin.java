package com.svetlanadiab.happinessspace;

import android.Manifest;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
        name = "MicrophonePermission",
        permissions = @Permission(
                strings = { Manifest.permission.RECORD_AUDIO },
                alias = MicrophonePermissionPlugin.MICROPHONE
        )
)
public class MicrophonePermissionPlugin extends Plugin {
    static final String MICROPHONE = "microphone";

    @PluginMethod
    public void ensure(PluginCall call) {
        if (getPermissionState(MICROPHONE) == PermissionState.GRANTED) {
            resolvePermission(call);
            return;
        }

        requestPermissionForAlias(MICROPHONE, call, "microphonePermissionCallback");
    }

    @PluginMethod
    public void check(PluginCall call) {
        resolvePermission(call);
    }

    @PermissionCallback
    private void microphonePermissionCallback(PluginCall call) {
        resolvePermission(call);
    }

    private void resolvePermission(PluginCall call) {
        boolean granted = getPermissionState(MICROPHONE) == PermissionState.GRANTED;
        JSObject result = new JSObject();
        result.put("granted", granted);
        result.put("microphone", granted ? "granted" : "denied");
        call.resolve(result);
    }
}
