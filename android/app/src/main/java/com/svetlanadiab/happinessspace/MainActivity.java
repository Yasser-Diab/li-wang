package com.svetlanadiab.happinessspace;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(BackgroundSyncPlugin.class);
        registerPlugin(AppUpdaterPlugin.class);
        registerPlugin(MicrophonePermissionPlugin.class);
        super.onCreate(savedInstanceState);
        BackgroundMessageWorker.schedule(this);
        BackgroundSyncService.start(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        deliverIntentToWeb(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        deliverIntentToWeb(intent);
    }

    private void deliverIntentToWeb(Intent intent) {
        if (
                intent == null ||
                        bridge == null ||
                        bridge.getWebView() == null ||
                        (
                                intent.getStringExtra("open_panel") == null &&
                                        intent.getStringExtra("open_update") == null
                        )
        ) {
            return;
        }

        String panelName = intent.getStringExtra("open_panel");
        String messageId = intent.getStringExtra("message_id");
        boolean openUpdate = intent.getStringExtra("open_update") != null;
        if (messageId == null) {
            messageId = "";
        }
        String safeMessageId = messageId.replace("\\", "\\\\").replace("'", "\\'");
        String safePanelName = panelName == null
                ? ""
                : panelName.replace("\\", "\\\\").replace("'", "\\'");
        String script =
                "window.dispatchEvent(new CustomEvent('svetaNativeOpen', { detail: { panel: '" +
                        safePanelName +
                        "', messageId: '" +
                        safeMessageId +
                        "', update: " +
                        openUpdate +
                        " } }));";
        bridge.getWebView().postDelayed(() -> bridge.getWebView().evaluateJavascript(script, null), 600);
        intent.removeExtra("open_panel");
        intent.removeExtra("message_id");
        intent.removeExtra("open_update");
    }
}
